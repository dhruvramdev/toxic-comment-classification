chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "delete_toxic_waste") {
            p = $(document).find("p");
            p.each((index, element) => {
                if (element.getAttribute('process_hs')) {
                    return;
                }
                let para = element.innerText;
                let lines = para.split(".");
                lines.forEach(line => {
                    chrome.runtime.sendMessage({
                        "sentence": line,
                        "message": "network_request"
                    }, function (result) {
                        if (result.success) {
                            // Set processed
                            element.setAttribute('process_hs', true);

                            let sum = 0;
                            for (let key in result.result) {
                                sum += result.result[key];
                            }
                            if (sum > 0) {
                                console.log("Toxicity Found");
                                console.log(para);
                                console.log(result.result);
                                processElement(element);
                            }
                        }
                    });
                })
            })

        }
    }
);

function processElement(element) {
    element.style.backgroundColor = "rgb(215, 218, 220)";
    if (!element.getAttribute('handler_hs')) {
        element.addEventListener("click", function () {
            // console.log(element.style.backgroundColor)
            element.setAttribute('handler_hs', true);
            if (element.style.backgroundColor === "rgb(215, 218, 220)") {
                element.style.backgroundColor = "transparent"
            } else {
                element.style.backgroundColor = "rgb(215, 218, 220)"
            }
        })
    }

}

console.log("Activating Chrome Extension: Hate Speech");
chrome.runtime.sendMessage({"message": "activate_icon"});
