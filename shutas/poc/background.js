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
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayStockInfo,
      });
      let word = info.selectionText;  // 選択文字列を取得する
      break;
  }
});

function displayStockInfo() {
  window.alert('testing🎉');
}