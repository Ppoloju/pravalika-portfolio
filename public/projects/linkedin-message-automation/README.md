# LinkedIn Messaging Automation

An automated LinkedIn messaging system built with Playwright and Express that sends personalized messages to LinkedIn profiles via a REST API.

## Introduction

This project is an automation system that sends LinkedIn messages automatically. Instead of manually opening LinkedIn and sending messages, this system does everything automatically using code.

It works using:
- **Node.js** (backend server)
- **Playwright** (browser automation)
- **n8n** (workflow in browser)
- **ngrok** (public link for testing)

## Project Goal

The main goal of this project is:
- Send LinkedIn messages automatically
- Use API requests to trigger automation
- Connect n8n workflow with backend
- Automate browser actions using Playwright

## Required Software (Install Before Starting)

### 3.1 Node.js

Download: https://nodejs.org

Check installation:
```bash
node -v
npm -v
```

### 3.2 Google Chrome or Edge

Used by Playwright to open LinkedIn.

### 3.3 ngrok

Download: https://ngrok.com/download

After installation, connect account:
```bash
ngrok config add-authtoken YOUR_TOKEN
```

### 3.4 n8n

No installation required. Open in browser: http://localhost:5678

## Project Folder Structure

After extracting the project:
```
linkedin-message-automation/
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── Linkedin message automation.json (n8n workflow)
├── node_modules/   (created after npm install)
└── auth.json       (created after first login)
```

## Important Notes Before Starting

- **Do NOT send auth.json** - it contains your LinkedIn session and is created after first login
- n8n runs in browser (no installation needed)
- The n8n workflow JSON file is included: `Linkedin message automation.json`

## Step-by-Step Setup Process

Follow exactly in order:

### STEP 1: Extract Project

Extract the project folder. Better to create a folder on desktop and then unzip.

### STEP 2: Open Terminal

Go to the project folder and right-click → "Open in Terminal"

### STEP 3: Install Dependencies

Run this command:
```bash
npm install
```

What happens here:
- All required packages are downloaded
- node_modules folder is created automatically

### STEP 4: Install Playwright Browsers

```bash
npx playwright install chromium
```

### STEP 5: Start Backend Server

Run:
```bash
node index.js
```

After running:
- Server starts
- You will see: `Server running on http://localhost:3000`
- Keep this terminal open

### STEP 6: Start ngrok (NEW TERMINAL)

Open a new terminal in the same folder. Run:
```bash
ngrok http 3000
```

After running:
- ngrok creates a public link like: `https://riverside-snub-ricotta.ngrok-free.dev`
- This link is used for API calls

### STEP 7: Open n8n in Browser

Open: http://localhost:5678

Now do these steps:
1. Import the workflow from `Linkedin message automation.json`
2. Open the webhook node
3. Replace URL with ngrok URL: `https://riverside-snub-ricotta.ngrok-free.dev/send-linkedin-message`
4. Click "Activate Workflow"

### STEP 8: First Time Login (VERY IMPORTANT)

Because auth.json is NOT included:
1. Run: `node index.js`
2. A browser opens automatically
3. It opens LinkedIn login page
4. Enter username and password manually
5. Login successfully
6. System saves login session inside auth.json automatically

## How System Works (Flow)

When you send a request:
1. Request goes to ngrok URL
2. n8n receives request
3. n8n triggers backend
4. Node.js receives data
5. Playwright opens LinkedIn
6. Goes to profile
7. Types message
8. Sends message

## API Testing (IMPORTANT PART)

### STEP 8.1: Open PowerShell

Open PowerShell in any folder.

### STEP 8.2: Run Test Request

Replace ngrok link and run:
```powershell
Invoke-RestMethod `
  -Uri "https://riverside-snub-ricotta.ngrok-free.dev/send-linkedin-message" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"linkedin_url":"https://www.linkedin.com/in/example-profile","personalized_message":"Hello from test"}'
```

### What This Test Does

When you run the above:
1. PowerShell sends request
2. Request goes to ngrok
3. n8n receives request
4. Backend processes data
5. Playwright opens LinkedIn profile
6. Message is typed automatically
7. Message is sent

## Full Running Order (VERY IMPORTANT)

Always follow this order:

**Step 1:** `npm install`

**Step 2:** `node index.js`

**Step 3:** `ngrok http 3000`

**Step 4:** Open http://localhost:5678

**Step 5:** Activate workflow in n8n

**Step 6:** Run PowerShell test request

## API Endpoint

### POST /send-linkedin-message

Send a personalized message to a LinkedIn profile.

**Request Body:**
```json
{
  "id": "optional-id",
  "name": "John Doe",
  "email": "john@example.com",
  "linkedin_url": "https://www.linkedin.com/in/johndoe",
  "personalized_message": "Hi John, I'd like to connect with you..."
}
```

**Response (Success):**
```json
{
  "id": "optional-id",
  "name": "John Doe",
  "email": "john@example.com",
  "linkedin_url": "https://www.linkedin.com/in/johndoe",
  "personalized_message": "Hi John, I'd like to connect with you...",
  "status": "sent",
  "error": null
}
```

**Response (Error):**
```json
{
  "id": "optional-id",
  "name": "John Doe",
  "email": "john@example.com",
  "linkedin_url": "https://www.linkedin.com/in/johndoe",
  "personalized_message": "Hi John, I'd like to connect with you...",
  "status": "error",
  "error": "Error message here"
}
```

## Common Errors and Fixes

### Error 1: node_modules missing

**Fix:**
```bash
npm install
```

### Error 2: Playwright browser not opening

**Fix:**
```bash
npx playwright install chromium
```

### Error 3: Server not starting

**Fix:**
```bash
node index.js
```

### Error 4: n8n not triggering

**Fix:**
- Check ngrok URL
- Make sure workflow is active

### Error 5: Port already in use

**Fix:**
```bash
npx kill-port 3000
```

### Session Expired

If you see "LinkedIn redirected to security page" error:
1. Delete the `auth.json` file
2. Restart the server
3. Log in manually again

## Features

- **Automated LinkedIn Messaging**: Send personalized messages to LinkedIn profiles programmatically
- **Session Persistence**: Saves authentication state to avoid repeated logins
- **Smart Element Detection**: Robust selectors to find Message buttons and compose boxes
- **Person Verification**: Verifies the correct person is in the conversation before sending
- **Popup Handling**: Automatically dismisses LinkedIn popups and overlays
- **REST API**: Simple HTTP API for integration with other systems
- **Browser Automation**: Uses Playwright for reliable browser automation

## Key Components

- **index.js**: Main application file containing Express server and Playwright automation logic
- **auth.json**: Stores LinkedIn session authentication (auto-generated)
- **package.json**: Project dependencies and scripts
- **Linkedin message automation.json**: n8n workflow file for integration

## Dependencies

- **express**: Web server framework
- **playwright**: Browser automation library
- **cors**: Cross-Origin Resource Sharing support

## n8n Integration Setup (Microsoft Excel & Smartsheet)

### Overview

This project can be integrated with n8n for workflow automation. However, there are known issues with Microsoft Excel credential setup and Smartsheet integration in Docker environments.

### 1. Microsoft Excel Credential Issue (Docker Setup)

**Problem**: Unable to connect Microsoft Excel in the n8n Docker environment.

**Tried Accounts**:
- **Personal Microsoft account** → Not linking (Error: `unauthorized_client: The client does not exist or is not enabled for consumers`)
- **College account** → Cannot create or access credentials
- **Company account (Chidhagni)** → Requires authorization approval (Error: `AADSTS700016: Application with identifier was not found in the directory`)

**Result**: All accounts failed to connect due to authentication or permission issues.

**Impact**: Excel automation is not working in the Docker setup.

**Workaround**: For demo purposes, use the n8n Web Version where Microsoft Excel integration works properly.

### 2. Smartsheet Integration Issue

**Problem**: Smartsheet node is not available in n8n by default.

**Result**: Cannot directly use Smartsheet in workflows. Requires alternative methods using API or external tools.

### 3. Smartsheet Alternatives in n8n

Since there is no native Smartsheet node, the following alternatives can be used:

#### 3.1 HTTP Request Node (Best Alternative)

This is the most recommended approach as Smartsheet provides a REST API.

**What you can do**:
- Read sheets
- Add rows
- Update rows
- Delete rows
- Search data

**Example**:
```bash
GET https://api.smartsheet.com/2.0/sheets
```

**Headers**:
```
Authorization: Bearer YOUR_SMARTSHEET_TOKEN
Content-Type: application/json
```

This is the closest replacement for a Smartsheet node.

#### 3.2 Webhook-Based Integration

Used for event-driven workflows.

**Flow**: Smartsheet → Webhook → n8n

**Use cases**:
- Row added triggers workflow
- Status updates sent to n8n

#### 3.3 Middleware Tools (Zapier / Make)

Used as a bridge between Smartsheet and n8n.

**Flow**: Smartsheet → Zapier/Make → n8n

**Use cases**:
- Quick setup for demo
- No coding required

#### 3.4 Google Sheets / Excel Alternative

If Smartsheet is not mandatory, alternatives include:
- Google Sheets node (fully supported in n8n)
- Excel node (works in n8n web version)

These are easier and fully supported options.

#### 3.5 Custom Node (Advanced Option)

A Smartsheet node can be created manually.

**Requirements**:
- Custom node development
- Installation via npm in Docker
- Manual maintenance

Not recommended unless required for production use.

### 4. Current Working Setup (Demo)

For demo purposes:
- Using n8n Web Version
- Microsoft Excel integration is working properly in web version
- Workflows are being built and tested successfully

### 5. Conclusion

- Microsoft Excel integration is failing in Docker due to authentication and permission issues across personal, college, and company accounts
- Smartsheet is not available as a native node in n8n
- Best alternative for Smartsheet is HTTP Request node using REST API
- For demo purposes, n8n web version with Excel is being used successfully
- Webhooks, middleware tools, and Google Sheets are alternative options depending on use case

## Security Notes

- **Never commit `auth.json`** to version control - it contains your LinkedIn session
- The script runs in non-headless mode for visibility and debugging
- Use rate limiting to avoid LinkedIn's anti-automation measures
- Consider using LinkedIn's official API for production use cases

## License

ISC

## Author

Pravalika Poloju
