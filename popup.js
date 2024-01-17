chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.stockInfo) {
      document.getElementById("stock-info").innerHTML = request.stockInfo;
    }
  });