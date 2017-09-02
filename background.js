var contextMenuEnum = {ENCRYPTED_PASSWORD: "EPCM"};
var responseTypeEnum = {CORRECT: 1, WRONG: 0};

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    //if response is correct (right click on a password input)
    if(response == responseTypeEnum.CORRECT){ 
        //CREATE a context menu of Encrypted Password type
        chrome.contextMenus.create({
            id: contextMenuEnum.ENCRYPTED_PASSWORD,
            title: "Encrypted Password",
            contexts:["editable"]
        });
    }else{
        //REMOVE a context menu of Encrypted Password type
        chrome.contextMenus.remove(contextMenuEnum.ENCRYPTED_PASSWORD);
    }
})

chrome.contextMenus.onClicked.addListener(function (info, tab){
    //if click the context menu of the Encrypted Password
    if(info.menuItemId == contextMenuEnum.ENCRYPTED_PASSWORD){
        //do something here...
        alert("Encrypted Password");
    }        
})