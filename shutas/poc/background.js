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
      console.log("Inside displayStockInformation switch");
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
  //window.alert('testing🎉');
  console.log("Inside function");
  var div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "5px";
  div.style.left = "5px";
  div.style.width = "200px";
  div.style.height = "200px";
  div.style.backgroundColor = "navy";
  div.style.color = "yellow";
  div.innerHTML = "Stock information to display -> " + mySelectedWord;
  document.body.appendChild(div);
  setTimeout(() => {div.style.display = 'none';}, 5000);
}