var contextMenuEnum = {ENCRYPTED_PASSWORD: "EPCM"};
var responseTypeEnum = {CORRECT: 1, WRONG: 0};
var pageTitle;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        //REMOVE a context menu of Encrypted Password type
        chrome.contextMenus.remove(contextMenuEnum.ENCRYPTED_PASSWORD);
        
        //if response is correct (right click on a password input)
        if(request != responseTypeEnum.WRONG){ 
            pageTitle = request;
            //CREATE a context menu of Encrypted Password type
            chrome.contextMenus.create({
                id: contextMenuEnum.ENCRYPTED_PASSWORD,
                title: "Encrypted Password",
                contexts:["editable"]
            });
            
            //Construct & send a response
            sendResponse({
                response: "Message received"
            });
        }                
    }
);

//Listener to click on context menu
chrome.contextMenus.onClicked.addListener(
    function (info, tab){
        //if click the context menu of the Encrypted Password
        if(info.menuItemId == contextMenuEnum.ENCRYPTED_PASSWORD){                        
            //Select tab
            chrome.tabs.query({active: true, currentWindow: true}, 
                function(tabs) { 
                    getPassword(pageTitle, 
                                function(data){
                                    //Construct & send message
                                    chrome.tabs.sendMessage(tabs[0].id, {password: data}/*, 
                                        function(response) {
                                            //On response alert the response
                                            alert("The response from the content script: " + response.response);//You have to choose which part of the response you want to display ie. response.response
                                        }*/
                                    );    
                                }
                    );                                    
                }
            );
            /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {action: "content_script"}, function(response) {
                    
                });  
            });*/
        }        
    }
);

var getPassword = function (pageTitle, callback){
    var password;
    
//  TODO: do something here...
    password = pageTitle;
//
    
    callback(password);
}