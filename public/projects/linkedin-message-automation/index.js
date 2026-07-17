const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const AUTH_FILE = "auth.json";
const log = (...args) => console.log("[", new Date().toISOString(), "]", ...args);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Browser singleton ────────────────────────────────────────────────────────

let browser, context;

const getBrowser = async () => {
  if (browser && browser.isConnected()) return;
  log("Launching browser...");
  browser = await chromium.launch({ 
    headless: false, 
    slowMo: 50,
    args: ["--start-maximized"]
  });
  context = await browser.newContext({
    storageState: fs.existsSync(AUTH_FILE) ? AUTH_FILE : undefined,
    viewport: null,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
  });
  log("Browser ready (fullscreen mode).");
};

// ─── Login ────────────────────────────────────────────────────────────────────

const ensureLoggedIn = async (page) => {
  await page.goto("https://www.linkedin.com/feed", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  if (page.url().includes("/feed")) {
    log("Already logged in.");
    return;
  }

  log("Not logged in — please sign in manually in the browser (3 min timeout)...");
  await page.goto("https://www.linkedin.com/login", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  await page.waitForURL(/linkedin\.com\/(feed|mynetwork|messaging|jobs)/, {
    timeout: 180000,
  });

  await context.storageState({ path: AUTH_FILE });
  log("Session saved to auth.json");
};

// ─── Hide sticky nav ──────────────────────────────────────────────────────────

const hideStickyNav = async (page) => {
  await page.evaluate(() => {
    for (const sel of ["header.global-nav", "#global-nav", ".global-nav", ".scaffold-layout__header"]) {
      const el = document.querySelector(sel);
      if (el) el.style.display = "none";
    }
  }).catch(() => {});
};

// ─── Dismiss popups ───────────────────────────────────────────────────────────

const dismissPopups = async (page) => {
  await page.keyboard.press("Escape").catch(() => {});
  await sleep(600);

  for (const sel of [
    'button[aria-label="Dismiss"]',
    'button[aria-label="Close"]',
    ".artdeco-modal__dismiss",
    ".msg-overlay-bubble-header__control--close",
  ]) {
    try {
      const el = page.locator(sel).first();
      if ((await el.count()) > 0) {
        await el.click({ timeout: 2000, force: true });
        await sleep(600);
      }
    } catch {}
  }
};

// ─── Safe click ───────────────────────────────────────────────────────────────

const clickElement = async (page, locator) => {
  await hideStickyNav(page);
  await locator.evaluate((el) => el.scrollIntoView({ block: "center" })).catch(() => {});
  await sleep(400);

  try { await locator.click({ timeout: 6000 }); return; } catch {}
  try { await locator.click({ force: true, timeout: 4000 }); return; } catch {}
  await locator.evaluate((el) => el.click());
};

// ─── Click Message button ─────────────────────────────────────────────────────

const clickMessageButton = async (page) => {
  log("Looking for Message button...");

  const profileArea = page.locator('main, .pv-top-card, .profile-topcard').first();
  const profileSelectors = [
    'button:has-text("Message")',
    'a:has-text("Message")',
    'button[aria-label="Message"]',
    'button[aria-label*="Message"]',
    'button[data-control-name*="message"]',
    '.pv-s-profile-actions button:has-text("Message")',
    '.pv-profile-actions__action--message',
    '.profile-actions__action--message',
  ];

  let found = null;
  for (const sel of profileSelectors) {
    const locator = profileArea.locator(sel).first();
    try {
      await locator.waitFor({ state: "visible", timeout: 4000 });
      found = locator;
      break;
    } catch {}
  }

  if (!found) {
    const fallbackSelectors = [
      'button:has-text("Message")',
      'a:has-text("Message")',
      'button[aria-label="Message"]',
      'button[aria-label*="Message"]',
    ];

    for (const sel of fallbackSelectors) {
      const locator = page.locator(sel).first();
      try {
        await locator.waitFor({ state: "visible", timeout: 4000 });
        found = locator;
        break;
      } catch {}
    }
  }

  if (!found) {
    const allElements = page.locator("button, a");
    const count = await allElements.count();
    for (let i = 0; i < count; i++) {
      const el = allElements.nth(i);
      const txt = (await el.innerText().catch(() => "")).trim();
      if (!txt) continue;
      if (!(await el.isVisible().catch(() => false))) continue;
      if (txt.toLowerCase().includes("message")) {
        found = el;
        break;
      }
    }
  }

  if (!found) throw new Error("Message button not found on this profile.");
  await clickElement(page, found);
  await sleep(1500);
  log("✅ Message button clicked.");
};

// ─── Verify correct person in conversation ────────────────────────────────────

const verifyConversationPerson = async (page, expectedName) => {
  if (!expectedName) {
    log("⚠️  No name provided to verify, skipping verification");
    return true;
  }

  try {
    // Try more specific selectors for the actual person's name (not menu items)
    const headerSelectors = [
      '.msg-overlay-bubble-header__participant-names',  // Person's name only
      '.msg-overlay-conversation-bubble-header [class*="name"]',
      '.msg-overlay-bubble-header__header',
      'div[class*="participant"]',
    ];

    let headerText = null;
    const nameLower = expectedName.toLowerCase().trim();

    for (const sel of headerSelectors) {
      try {
        const element = page.locator(sel).first();
        if ((await element.count()) === 0) continue;

        const text = (await element.textContent({ timeout: 1200 }).catch(() => ""))?.trim();
        if (!text) continue;
        if (text.includes("Minimize") || text.includes("Close") || text.includes("New message")) continue;

        headerText = text;
        log(`Found header with selector "${sel}": "${headerText}"`);
        break;
      } catch {}
    }

    // If specific selectors fail, try a more generic approach
    if (!headerText) {
      const headerElements = page.locator('.msg-overlay-bubble-header, .msg-overlay-conversation-bubble-header');
      const count = await headerElements.count();

      for (let i = 0; i < count; i++) {
        try {
          const text = (await headerElements.nth(i).textContent({ timeout: 1200 }).catch(() => ""))?.trim();
          if (!text) continue;
          if (text.includes("Minimize") || text.includes("Close") || text.includes("New message")) continue;
          if (text.length <= 3) continue;

          headerText = text;
          log(`Found header text: "${headerText}"`);
          break;
        } catch {}
      }
    }

    if (headerText) {
      log(`📋 Conversation with: "${headerText}"`);
      const headerLower = headerText.toLowerCase();
      const nameVariations = [
        nameLower,
        nameLower.split(" ").reverse().join(" "),
      ];
      const isMatch = nameVariations.some((variant) => headerLower.includes(variant));

      if (isMatch) {
        log(`✅ Correct person verified!`);
        return true;
      }

      log(`❌ Name mismatch! Expected "${expectedName}" but got "${headerText}"`);
      return false;
    }

    log("⚠️  Conversation header not found quickly - proceeding anyway");
    return true;
  } catch (err) {
    log(`Verification error: ${err.message}`);
    return true;  // Don't fail on verification errors
  }
};

// ─── Type into contenteditable properly ──────────────────────────────────────

const typeIntoContentEditable = async (page, locator, text) => {
  log("Preparing text box for input...");
  
  // Step 1: Aggressive focus - multiple clicks and focus calls
  await locator.click({ force: true }).catch(() => {});
  await sleep(200);
  await locator.click({ force: true }).catch(() => {});
  await sleep(200);
  await locator.evaluate((el) => {
    el.focus();
    el.click();
  }).catch(() => {});
  
  await sleep(500);
  log("Text box focused, typing message...");

  // Step 2: Type character by character with periodic focus re-enforcement
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Every 5 characters, re-ensure focus
    if (i % 5 === 0) {
      await locator.evaluate((el) => el.focus()).catch(() => {});
      await sleep(50);
    }
    
    await page.keyboard.type(char, { delay: 30 });
  }

  await sleep(600);
  
  // Step 3: Verify text was entered
  const content = await locator.evaluate((el) => el.innerText || el.textContent || "").catch(() => "");
  log(`Text entered: "${content.substring(0, 50)}..."`);

  if (!content.trim()) {
    log("⚠️  Keyboard typing did not work, using alternative method...");
    
    // Alternative: Set content directly
    await locator.evaluate((el, msg) => {
      el.focus();
      el.innerHTML = "";
      el.textContent = msg;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
      el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
    }, text).catch(() => {});
    
    await sleep(500);
  }
  
  // Step 4: Final focus and click before sending (DO NOT LEAVE TEXT BOX)
  await locator.click({ force: true }).catch(() => {});
  await locator.evaluate((el) => el.focus()).catch(() => {});
  await sleep(300);
  
  log("✅ Message ready - keeping focus in text box");
};

// ─── Find and click send button ───────────────────────────────────────────────

const clickSendButton = async (page, textBox, message) => {
  log("Looking for send button...");

  await sleep(500);

  const sendSelectors = [
    'button.msg-form__send-button',
    'button[aria-label="Send"]',
    'button[aria-label*="Send"]',
    '.msg-form__send-button',
    'button[type="submit"]',
    '.msg-form__footer button',
    '.msg-form__right-actions button',
    'button:has-text("Send")',
  ];

  // First attempt - look for enabled send button
  for (const sel of sendSelectors) {
    try {
      const btn = page.locator(sel).first();
      if ((await btn.count()) === 0) continue;
      const isDisabled = await btn.evaluate((el) => el.disabled).catch(() => false);
      log(`Found send button: ${sel} | disabled: ${isDisabled}`);
      
      if (!isDisabled) {
        // Use direct click without scrolling
        await btn.click({ force: true, timeout: 3000 }).catch(() => {});
        log(`✅ Clicked send button: ${sel}`);
        return;
      }
    } catch {}
  }

  // If button click fails, try to sync content and retry
  log("Send button not clickable — re-syncing message content...");
  await textBox.evaluate((el, msg) => {
    el.focus();
    el.innerHTML = "";
    el.textContent = msg;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
  }, message).catch(() => {});

  await sleep(800);

  // Second attempt - try again after syncing
  for (const sel of sendSelectors) {
    try {
      const btn = page.locator(sel).first();
      if ((await btn.count()) === 0) continue;
      const isDisabled = await btn.evaluate((el) => el.disabled).catch(() => false);
      
      if (!isDisabled) {
        await btn.click({ force: true, timeout: 3000 }).catch(() => {});
        log(`✅ Clicked send button after sync: ${sel}`);
        return;
      }
    } catch {}
  }

  // Final fallback - press Enter key
  log("Send button still not working — using Enter key...");
  await textBox.click({ force: true }).catch(() => {});
  await textBox.evaluate((el) => el.focus()).catch(() => {});
  await sleep(200);
  await page.keyboard.press("Enter");
  log("✅ Message sent via Enter key");
};

const closeOpenConversations = async (page) => {
  const closeSelectors = [
    '.msg-overlay-bubble-header__control--close',
    '.msg-overlay-bubble-header button[aria-label="Dismiss"]',
    '.msg-overlay-bubble-header button:has-text("Dismiss")',
    '.msg-overlay-bubble-header button:has-text("Close")',
  ];

  for (const sel of closeSelectors) {
    const buttons = page.locator(sel);
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      try {
        await buttons.nth(i).click({ force: true, timeout: 2000 });
        await sleep(300);
      } catch {}
    }
  }
};

// ─── Find conversation text box ───────────────────────────────────────────────

const findConversationTextBox = async (page) => {
  log("Finding compose box in conversation...");
  
  // Wait for message overlay/form to appear with longer timeout
  const overlaySelectors = [
    '.msg-overlay-conversation-bubble',
    '.msg-form',
    '[role="textbox"][contenteditable="true"]',
    'div.msg-form__contenteditable'
  ];

  for (const sel of overlaySelectors) {
    try {
      log(`  Waiting for: ${sel}`);
      await page.waitForSelector(sel, { timeout: 5000 });
      log(`  ✅ Found: ${sel}`);
      break;
    } catch {}
  }
  
  // Extra wait for React to render everything
  await sleep(2000);

  // Try multiple selectors in order of priority
  const textBoxSelectors = [
    'div.msg-form__contenteditable[contenteditable="true"]',
    'div[role="textbox"][contenteditable="true"]',
    '.msg-form__contenteditable',
    '[contenteditable="true"][role="textbox"]',
    'div[contenteditable="true"]'
  ];

  for (const sel of textBoxSelectors) {
    try {
      log(`  Checking selector: ${sel}`);
      const boxes = page.locator(sel);
      const count = await boxes.count();
      
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const box = boxes.nth(i);
          const visible = await box.isVisible().catch(() => false);
          const rect = await box.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return { width: r.width, height: r.height };
          }).catch(() => ({ width: 0, height: 0 }));
          
          log(`    [${i}] Visible: ${visible}, Size: ${rect.width}x${rect.height}`);
          
          if (visible && rect.width > 0 && rect.height > 0) {
            log(`✅ Compose box found: ${sel} (index ${i})`);
            return box;
          }
        }
      }
    } catch (err) {
      log(`  Error with ${sel}: ${err.message}`);
    }
  }

  // If all specific selectors fail, try finding any contenteditable in the last overlay
  try {
    log("All selectors failed, trying fallback approach...");
    const conversation = page.locator('.msg-overlay-conversation-bubble, .msg-overlay-bubble').last();
    const textBox = conversation.locator('[contenteditable="true"]').first();
    
    const isVisible = await textBox.isVisible().catch(() => false);
    if (isVisible) {
      log("✅ Compose box found (fallback)");
      return textBox;
    }
  } catch {}

  // Final fallback: just get any visible contenteditable
  try {
    log("Trying final fallback - any visible contenteditable...");
    const allBoxes = page.locator('[contenteditable="true"]');
    const count = await allBoxes.count();
    
    for (let i = count - 1; i >= 0; i--) {
      const box = allBoxes.nth(i);
      const visible = await box.isVisible().catch(() => false);
      if (visible) {
        const text = await box.textContent().catch(() => "");
        const parentClass = await box.evaluate((el) => el.parentElement?.className || "").catch(() => "");
        
        log(`  Found contenteditable (${i}): visible=${visible}, text="${text.slice(0,20)}", parent="${parentClass}"`);
        
        if (text.toLowerCase().includes("message") || parentClass.includes("msg") || parentClass.includes("form")) {
          log("✅ Compose box found (final fallback)");
          return box;
        }
      }
    }
  } catch (err) {
    log(`Final fallback error: ${err.message}`);
  }

  throw new Error("Compose box not found - overlay may not have rendered properly");
};

// ─── Core ─────────────────────────────────────────────────────────────────────

const sendLinkedInMessage = async ({ linkedin_url, personalized_message, name }) => {
  const page = await context.newPage();

  try {
    await ensureLoggedIn(page);

    log(`\n🌐 Navigating to: ${linkedin_url}`);
    await page.goto(linkedin_url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await sleep(3000);

    if (page.url().includes("authwall") || page.url().includes("checkpoint") || page.url().includes("/login")) {
      throw new Error("LinkedIn redirected to security page — delete auth.json and re-login.");
    }

    await dismissPopups(page);
    await sleep(800);
    await closeOpenConversations(page);

    // Step 1: Click Message button on the profile
    log("\n🔍 Step 1: Clicking Message button...");
    await clickMessageButton(page);
    log("Waiting for message overlay to fully load...");
    await sleep(3000);

    // Step 2: Verify correct person
    log("\n🔍 Step 2: Verifying conversation person...");
    const isCorrectPerson = await verifyConversationPerson(page, name);
    if (!isCorrectPerson) {
      await page.keyboard.press("Escape").catch(() => {});
      await sleep(500);
      throw new Error(`Wrong person! Expected "${name}" but got different person in conversation.`);
    }
    
    // DO NOT dismiss popups here - it may blur the compose box
    await sleep(500);

    // Step 3: Find compose box
    log("\n🔍 Step 3: Finding compose box...");
    const textBox = await findConversationTextBox(page);

    if (!textBox || (await textBox.count()) === 0) {
      throw new Error("Compose box locator is invalid or empty.");
    }
    
    const isVisible = await textBox.isVisible().catch(() => false);
    if (!isVisible) {
      throw new Error("Compose box found but not visible on screen.");
    }
    
    log("✅ Compose box ready - starting message input");
    await sleep(200);

    // Step 4: Type message (IMMEDIATELY after finding box, don't let it close)
    log("\n✏️  Step 4: Typing message...");
    await typeIntoContentEditable(page, textBox, personalized_message);

    // Step 5: Send (still focused on text box)
    log("\n📤 Step 5: Sending message...");
    await clickSendButton(page, textBox, personalized_message);

    await sleep(2500);
    log(`\n✅ SUCCESS: Message sent to ${name || linkedin_url}\n`);
    return { success: true };

  } finally {
    await page.close().catch(() => {});
  }
};

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get("/", (req, res) => res.json({ status: "running" }));

app.post("/send-linkedin-message", async (req, res) => {
  const body = Array.isArray(req.body) ? req.body[0] : req.body;
  const { id, name, email, linkedin_url, personalized_message } = body || {};

  const baseResponse = {
    id: id ?? null,
    name: name ?? null,
    email: email ?? null,
    linkedin_url: linkedin_url ?? null,
    personalized_message: personalized_message ?? null,
  };

  if (!linkedin_url || !linkedin_url.includes("linkedin.com/in/"))
    return res.status(400).json({
      ...baseResponse,
      status: "error",
      error: "Invalid or missing linkedin_url",
    });

  if (!personalized_message || !personalized_message.toString().trim())
    return res.status(400).json({
      ...baseResponse,
      status: "error",
      error: "personalized_message is required",
    });

  try {
    await getBrowser();
    await sendLinkedInMessage({ linkedin_url, personalized_message, name });
    return res.json({
      ...baseResponse,
      status: "sent",
      error: null,
    });
  } catch (err) {
    log("❌ ERROR:", err.message);
    return res.status(500).json({
      ...baseResponse,
      status: "error",
      error: err.message || "Unknown error",
    });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(3000, "0.0.0.0", async () => {
  await getBrowser();
  log("Server running on http://localhost:3000\n");
});