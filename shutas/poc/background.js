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
      let pointerX = -1;
      let pointerY = -1;
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

  var div = document.createElement("div");
  div.style.id = "myPopup"
  div.style.position = "fixed";
  div.style.bottom = "30px";
  div.style.right = "30px";
  div.style.width = "500px";
  div.style.height = "500px";
  div.style.backgroundColor = "navy";
  div.style.color = "yellow";
  div.innerHTML = "Stock information to display -> " + mySelectedWord;
  document.body.appendChild(div);

  setTimeout(() => {div.style.display = 'none';}, 5000);
}

