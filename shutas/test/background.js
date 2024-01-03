chrome.runtime.onInstalled.addListener(function () {
  console.log("Text Popup Extension Installed");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateSelectedText") {
    chrome.scripting.executeScript({
      target: {tabId: sender.tab.id},
      function: updateSelectedText
    });
  }
});

function updateSelectedText() {
  var selectedText = window.getSelection().toString().trim();
  chrome.runtime.sendMessage({ action: "getSelectedText", selectedText: selectedText });
}
