# LinkedIn Messaging Automation

An automated LinkedIn messaging system built with Playwright and Express that sends personalized messages to LinkedIn profiles via a REST API.

## Features

- **Automated LinkedIn Messaging**: Send personalized messages to LinkedIn profiles programmatically
- **Session Persistence**: Saves authentication state to avoid repeated logins
- **Smart Element Detection**: Robust selectors to find Message buttons and compose boxes
- **Person Verification**: Verifies the correct person is in the conversation before sending
- **Popup Handling**: Automatically dismisses LinkedIn popups and overlays
- **REST API**: Simple HTTP API for integration with other systems
- **Browser Automation**: Uses Playwright for reliable browser automation

## Demo

A demo recording is available in this project: `Recording 2026-06-08 105957.mp4`

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Usage

### Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### First Run - Authentication

On the first run, the browser will open and you'll need to:
1. Manually log in to LinkedIn when prompted
2. The session will be saved to `auth.json`
3. Subsequent runs will use the saved session

### API Endpoint

#### POST /send-linkedin-message

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

### Example Usage with cURL

```bash
curl -X POST http://localhost:3000/send-linkedin-message \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "linkedin_url": "https://www.linkedin.com/in/johndoe",
    "personalized_message": "Hi John, I came across your profile and would like to connect."
  }'
```

### Example Usage with JavaScript

```javascript
const response = await fetch('http://localhost:3000/send-linkedin-message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    linkedin_url: 'https://www.linkedin.com/in/johndoe',
    personalized_message: 'Hi John, I came across your profile and would like to connect.'
  })
});

const result = await response.json();
console.log(result);
```

## How It Works

1. **Browser Launch**: Launches Chromium browser in fullscreen mode
2. **Authentication**: Checks for saved session in `auth.json`, prompts for login if needed
3. **Navigation**: Navigates to the target LinkedIn profile
4. **Message Button**: Finds and clicks the Message button using multiple selector strategies
5. **Verification**: Verifies the correct person is in the conversation
6. **Compose Box**: Locates the message compose box in the conversation overlay
7. **Message Input**: Types the personalized message character by character
8. **Send**: Clicks the Send button or uses Enter key to send the message
9. **Cleanup**: Closes the page and returns success status

## Key Components

- **index.js**: Main application file containing Express server and Playwright automation logic
- **auth.json**: Stores LinkedIn session authentication (auto-generated)
- **package.json**: Project dependencies and scripts

## Dependencies

- **express**: Web server framework
- **playwright**: Browser automation library
- **cors**: Cross-Origin Resource Sharing support

## Troubleshooting

### Session Expired
If you see "LinkedIn redirected to security page" error:
1. Delete the `auth.json` file
2. Restart the server
3. Log in manually again

### Message Button Not Found
The script uses multiple fallback selectors to find the Message button. If it still fails:
- Ensure the LinkedIn profile URL is correct
- Check if you're already connected to the person
- Verify the profile has a Message button (some profiles don't)

### Compose Box Not Found
If the compose box isn't detected:
- Wait for the message overlay to fully load
- Check if LinkedIn's UI has changed (selectors may need updating)
- Ensure no popups are blocking the overlay

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
