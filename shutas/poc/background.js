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
      let word = info.selectionText;  // 選択文字列を取得する
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayStockInfo,
      });
      break;
  }
});

function displayStockInfo() {
  //window.alert('testing🎉');
  var div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "5px";
  div.style.left = "5px";
  div.style.width = "200px";
  div.style.height = "200px";
  div.style.backgroundColor = "black";
  div.style.color = "white";
  div.innerHTML = "Stock info goes here";
  document.body.appendChild(div);
}