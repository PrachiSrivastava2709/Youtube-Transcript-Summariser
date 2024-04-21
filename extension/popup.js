document.addEventListener("DOMContentLoaded", () => {
    var summarizeButton = document.querySelector('.btn');
    var summaryElement = document.querySelector('.summary');
        
    summarizeButton.addEventListener('click', () => {
        // Send a message to content script to trigger summary generation
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {action: "generateSummary", url: activeTab.url}, (response) => {
                console.log("Message sent to content script from popup js");
            })
        })
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action === "outputSummary") {
            summaryElement.textContent = message.payload;
        }
        else (
            summaryElement.textContent = message.payload
        )
    });
});

// Access to fetch at 'http://localhost:5000' from origin 'https://www.youtube.com' has been 
// blocked by CORS policy: No 'Access-Control-Allow-Origin' header is 
// present on the requested resource. If an opaque response serves your needs, set the 
// request's mode to 'no-cors' to fetch the resource with CORS disabled.