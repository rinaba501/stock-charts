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

  var newDiv = document.createElement("div");
  newDiv.style.id = "myPopup"
  newDiv.style.position = "fixed";
  newDiv.style.bottom = "30px";
  newDiv.style.right = "30px";
  newDiv.style.width = "500px";
  newDiv.style.height = "500px";
  newDiv.style.backgroundColor = "rgba(173, 216, 230, 0.9)";
  newDiv.style.color = "yellow";
  newDiv.style.borderRadius = "40px"; 
  newDiv.style.zIndex = "9999";
  newDiv.draggable = true;


  document.body.appendChild(newDiv);

  var closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.textAlign = "center";
  closeButton.style.position = "absolute";
  closeButton.style.top = "0px";
  closeButton.style.right = "0px";
  closeButton.style.width = "25px";
  closeButton.style.height = "25px";
  closeButton.style.color = "white";
  closeButton.style.display = "none";
  closeButton.style.borderRadius = "12.5px"; 
  closeButton.style.backgroundColor = "rgba(173, 216, 230, 0.5)"; 
  closeButton.addEventListener("click", function() {
    // Close the div when the button is clicked
    newDiv.remove();
  });
  newDiv.appendChild(closeButton);

  // Event listener for hover
  newDiv.addEventListener("mouseover", function() {
    closeButton.style.display = "block"; // Show the div when hovered over
  });

  newDiv.addEventListener("mouseout", function() {
    closeButton.style.display = "none"; // Hide the div when mouse leaves
  });
  // loadExternalStyles()

  var newDiv2 = document.createElement("div2");
  newDiv2.style.top = "100px";
  newDiv2.style.position = "absolute";
  newDiv2.style.left = "50%";
  newDiv2.style.transform = "translate(-50%, -50%)";

  // Fetch the content from the file
  fetch(chrome.runtime.getURL('inner.html'))
  .then(response => response.text())
  .then(htmlContent => {
    newDiv2.innerHTML = htmlContent;
  })
  .catch(error => {
    console.error('Error fetching content:', error);
  });
  newDiv.appendChild(newDiv2);


  makeElementDraggable(newDiv);
  // setTimeout(() => {div.style.display = 'none';}, 10000);
}

function makeElementDraggable(element) {
  let offsetX, offsetY, isDragging = false;

  element.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Set the new position of the element
    element.style.left = x + "px";
    element.style.top = y + "px";
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
}

function loadExternalStyles() {
  var linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = chrome.runtime.getURL('chart.css'); // Replace 'styles.css' with your CSS file
  document.head.appendChild(linkElement);
}
