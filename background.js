// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "downloadMenu",
    title: "Download PlateRecognizer Images",
    contexts: ["all"],
  });
});

// Handle clicks on the context menu items
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "downloadMenu") {
    // Send a message to the content script to download images from the page
    chrome.tabs.sendMessage(tab.id, { action: "downloadImages" });
  }
});

// Listen for download requests from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.downloads.download({ url: request.url, filename: request.filename });
  }
});
