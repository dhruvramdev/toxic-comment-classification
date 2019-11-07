// chrome.pageAction.onClicked.addListener(function (tab) {
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    console.log("Clicked Page Actions");
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "delete_toxic_waste"});
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "network_request") {
            $.ajax({
                url: "http://localhost:5000/detect",
                type: "POST",
                data: JSON.stringify({sentence: request.sentence}),
                contentType: "application/json",
                dataType: "json",
            }).done(result => {
                sendResponse(result);
            }).fail(error => {
                console.log(error)
            });
            return true;
        }
    }
);

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "activate_icon") {
            console.log("Activated");
            chrome.pageAction.show(sender.tab.id);
        }
    }
);