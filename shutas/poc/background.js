chrome.runtime.onInstalled.addListener(function (details) {
  /* コンテキストメニューを作成 */
  const parent = chrome.contextMenus.create({
    id: "displayStockInformation", 
    title: "Display Stock Information",
    contexts: ["all"]
  });
});

/* コンテキストメニューがクリックされた時の処理 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "displayStockInformation":
      console.log("Inside switch");
      let selectedWord = info.selectionText;  // 選択文字列を取得する
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayStockInfo,
        args : [ selectedWord ]
      });
      break;
  }
});

function displayStockInfo(mySelectedWord) {
  console.log("Inside dSI function");

  var content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="styles.css">
      <title>Stock Information</title>
  </head>
  <body>

      <div class="stock-info">
          <h2>Stock Information</h2>
          <div class="stock-data">
              <span class="stock-label">Symbol:</span>
              <span id="symbol">AAPL</span>
          </div>
          <div class="stock-data">
              <span class="stock-label">Price:</span>
              <span id="price">$150.00</span>
          </div>
          <div class="stock-data">
              <span class="stock-label">Change:</span>
              <span id="change">+2.50 (+1.5%)</span>
          </div>
          <button id="myButton">Click me</button>
      </div>

      <!-- You can add JavaScript code here to fetch and update real-time stock data -->

  </body>
  </html>
  `

  var div = document.createElement("div");
  div.style.id = "myPopup"
  div.style.position = "fixed";
  div.style.bottom = "30px";
  div.style.right = "30px";
  div.style.width = "500px";
  div.style.height = "500px";
  div.style.backgroundColor = "navy";
  div.style.color = "yellow";
  div.innerHTML = "TO-DO: Create a stock info popup for => " + mySelectedWord + content;
  document.body.appendChild(div);

  setTimeout(() => {div.style.display = 'none';}, 10000);
}

