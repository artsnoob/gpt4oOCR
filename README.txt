# Screenshot OCR Chrome Extension

This Chrome extension allows users to capture screenshots of web pages and perform Optical Character Recognition (OCR) on the captured images using OpenAI's GPT-4 Vision model.

## Features

- Capture visible part of the current tab
- Perform OCR on the captured screenshot
- Display extracted text in the extension popup

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Click the "Capture and OCR" button.
3. Wait for the screenshot to be captured and processed.
4. The extracted text will appear in the text area within the popup.

## Configuration

Before using the extension, you need to add your OpenAI API key:

1. Open `background.js`.
2. Replace `'xxx'` in the `apiKey` variable with your actual OpenAI API key.

```javascript
const apiKey = 'your_api_key_here';
```

## Files

- `manifest.json`: Extension configuration
- `popup.html`: HTML for the extension popup
- `popup.js`: JavaScript for the popup functionality
- `background.js`: Background script for capturing screenshots and performing OCR
- `content-script.js`: Content script for full-page screenshot capture (currently unused)

## Dependencies

This extension uses the following APIs and services:

- Chrome Extension APIs
- OpenAI GPT-4o Vision API

## Limitations

- The current version only captures the visible part of the tab. Full-page screenshot functionality is implemented in `content-script.js` but not utilized.
- OCR accuracy depends on the quality of the captured image and the capabilities of the GPT-4 Vision model.

## Security Note

Be cautious with your API key. Avoid sharing the extension or pushing the code to public repositories with your API key included.
