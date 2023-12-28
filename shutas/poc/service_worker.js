chrome.contextMenus.create({
    "id": "myExtension", 
    "title": "Display Stock Information",
    "contexts": ["all"]
  });
  
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "myExtension") {
      // 追加した右クリックの項目がクリックされた時の処理を書く
      let word = info.selectionText;  // 選択文字列を取得する
    }
  });