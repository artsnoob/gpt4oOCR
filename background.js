chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture") {
      captureAndOCR().then(sendResponse);
      return true; // Indicates we will send a response asynchronously
    }
  });
  
  async function captureAndOCR() {
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      const dataUrl = await chrome.tabs.captureVisibleTab(null, {format: 'png'});
      const text = await performOCR(dataUrl);
      return {text};
    } catch (error) {
      return {error: error.message};
    }
  }
  
  async function performOCR(imageDataUrl) {
    const apiKey = 'xxx'; // Replace with your actual API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    const requestBody = {
      model: "gpt-4o",
      messages: [
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "What's the text content in this image? Please provide only the extracted text without any additional explanation."},
            {
              "type": "image_url",
              "image_url": {
                "url": imageDataUrl,
              },
            },
          ],
        }
      ],
      max_tokens: 300,
    };
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
  
    const result = await response.json();
    return result.choices[0].message.content;
  }