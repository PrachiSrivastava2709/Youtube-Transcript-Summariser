// Add event listener to listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("caught message from content script")
    if (message.action === "generateSummary"){
        var currentTabUrl = sender.tab.url;
        console.log(currentTabUrl)
    }
    sendResponse("hello from content script")
});
