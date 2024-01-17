chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.selectionText) {
      sendResponse({ success: true });
      chrome.runtime.sendMessage({ selectionText: request.selectionText });
    }
  });