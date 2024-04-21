// Add event listener to listen for messages from popup.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("caught message from content script")
    if (message.action === "generateSummary"){
        var currentTabUrl = message.url;

        // GET request to backend
        try {
            const summary = await fetch('http://localhost:5000/api/summarize?youtube_url=' + currentTabUrl)
            .then((response) => response.json())
            .then((data) => {return data.summary;})
            // Send a message to popup.js with the summarized text
            chrome.runtime.sendMessage({message: "outputSummary", payload: summary})

        }catch(err){
            console.log(err);
            console.log("Error: Unable to fetch summary")
            chrome.runtime.sendMessage({action: "error", payload: "server error or video doesnt contain transcript"})
        }
    }
});