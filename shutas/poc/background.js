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
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background-color: #f2f2f2;
          }

          .stock-info {
              border: 1px solid #ddd;
              background-color: #fff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 15px;
              width: 300px;
              margin: 0 auto;
              border-radius: 8px;
              overflow: hidden;
          }

          h2 {
              margin-top: 0;
              font-size: 18px;
              color: #1a0dab;
          }

          .stock-data {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              font-size: 14px;
              color: #333;
          }

          .stock-label {
              font-weight: bold;
              color: #555;
          }
      </style>
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

