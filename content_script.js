var contextMenuEnum = {ENCRYPTED_PASSWORD: "EPCM"};
var responseTypeEnum = {CORRECT: 1, WRONG: 0};
var mouseClickTypeEnum = {LEFT: 1, RIGHT: 2};

document.addEventListener("mousedown", function(event){
    var targetType = event.target.type;
    //if it was a right click
    if(event.button == mouseClickTypeEnum.RIGHT){
        //if the target is an input of password type
        if(targetType == "password")) {
            //send a message to background.js CREATE a context menu
            chrome.runtime.sendMessage(responseTypeEnum.CORRECT);
        }else{
            //send a message to background.js REMOVE a context menu
            chrome.runtime.sendMessage(responseTypeEnum.WRONG);
        }   
    }
}, true);