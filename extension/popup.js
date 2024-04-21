document.addEventListener("DOMContentLoaded", () => {
    var summarizeButton = document.querySelector('.btn');
    var summaryElement = document.querySelector('.summary');
        
    // console.log("I am here");
    summarizeButton.addEventListener('click', () => {
        // Send a message to content script to trigger summary generation
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {action: "generateSummary"}, (response) => {
                console.log("Message sent to content script from popup js");
                console.log(response);
            })
        })
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action === "outputSummary") {
            summaryElement.textContent = message.summary;
        }
    });
});