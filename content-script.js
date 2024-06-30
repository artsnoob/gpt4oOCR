function captureFullPage() {
    return new Promise((resolve) => {
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
  
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scale = window.devicePixelRatio;
  
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
  
      function capturePartial(startY, endY) {
        return new Promise((resolvePartial) => {
          const partialHeight = endY - startY;
          window.scrollTo(0, startY);
  
          setTimeout(() => {
            ctx.drawImage(document.documentElement, 0, -startY, width, height, 0, startY, width, partialHeight);
            resolvePartial();
          }, 100);
        });
      }
  
      const stepSize = window.innerHeight;
      const steps = Math.ceil(height / stepSize);
  
      let currentStep = 0;
      function captureNextPart() {
        if (currentStep < steps) {
          const startY = currentStep * stepSize;
          const endY = Math.min((currentStep + 1) * stepSize, height);
          capturePartial(startY, endY).then(() => {
            currentStep++;
            captureNextPart();
          });
        } else {
          canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        }
      }
  
      captureNextPart();
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureFullPage") {
      captureFullPage().then(sendResponse).catch(error => {
        console.error('Error in captureFullPage:', error);
        sendResponse({error: error.message});
      });
      return true;
    }
  });
  