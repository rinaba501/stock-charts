const API_KEY = "V6Z2PJWT5R9MOW0J";

chrome.contextMenus.create({
  title: "Get Stock Info",
  contexts: ["selection"],
  onclick: function (info, tab) {
    chrome.tabs.sendMessage(tab.id, { selectionText: info.selectionText });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.selectionText) {
    sendResponse({ success: true });
    fetchStockInfo(request.selectionText);
  }
});

function fetchStockInfo(companyName) {
  const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${API_KEY}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.bestMatches && data.bestMatches.length > 0) {
        const stockSymbol = data.bestMatches[0]["1. symbol"];
        displayStockInfo(stockSymbol);
      } else {
        displayStockInfo("Not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching stock info:", error);
      displayStockInfo("Error fetching stock info");
    });
}

function displayStockInfo(stockSymbol) {
  const stockInfo = `Stock Symbol: ${stockSymbol}`;
  chrome.runtime.sendMessage({ stockInfo });
}