var contextMenuEnum = {ENCRYPTED_PASSWORD: "EPCM"};
var responseTypeEnum = {CORRECT: 1, WRONG: 0};
var mouseClickTypeEnum = {LEFT: 1, RIGHT: 2};
var inputTypeEnum = {PASSWORD: "password"};

var inputPassword;

document.addEventListener("mousedown", function(event){
    var targetType = event.target.type;
    //if it was a right click
    if(event.button == mouseClickTypeEnum.RIGHT){
        //if the target is an input of password type
        if(targetType == inputTypeEnum.PASSWORD) {
            inputPassword = event.target;
            inputPassword.setAttribute("id", "inputPassword");
            //send a message to background.js CREATE a context menu
            chrome.runtime.sendMessage(window.location.hostname);
        }else{
            //send a message to background.js REMOVE a context menu
            chrome.runtime.sendMessage(responseTypeEnum.WRONG);
        }   
    }
}, true);

//Get message from background page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    //Set value of the password input  
    $("#" + inputPassword.id).sendkeys(request.password);
    //Construct & send a response
    /*sendResponse({
        response: "Message received"
    });*/
});