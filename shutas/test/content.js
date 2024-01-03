document.addEventListener("contextmenu", function (event) {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText !== "") {
    chrome.runtime.sendMessage({ action: "updateSelectedText" });
  }
});
