document.getElementById('captureBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "capture"}, (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        document.getElementById('resultText').value = response.text;
      }
    });
  });