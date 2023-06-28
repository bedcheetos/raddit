//status of raddit which can be togled in the popup
var ractive = true

//this function handles the outgoing communication of this background script to the content script
function messageContentScript(message){
    browser.tabs.query({active: true, currentWindow: true}) //getting the right tab so the right content script is adressed
        .then((tab) => {
            browser.tabs.sendMessage(tab[0].id, {
                command: message
            })
        })
        .catch((error) => console.error(error))
}

function reportError(error){
    console.error(error);
}

//handles the incoming communication with the content script and injects a css file
function listenForMessage(){
    browser.runtime.onMessage.addListener((message, sender) =>{
        if(message.command == "inject Css"){
            browser.tabs.insertCSS(sender.tab.id ,{file: "background_script/raddit.css"}).catch(error => reportError(error))
        }
    })
}

//start of script
try{
    //first it listens to the content script and informs it wether raddit is active or not
    browser.runtime.onMessage.addListener((message) => {
        if(message.command == 'get active'){
            return Promise.resolve({scriptActive: ractive})
        }
        //in case the raddit is toggled, the message will either be 'deactivate' or 'activate'
        else if(message.command == 'deactivate'){
            ractive = false
        }
        else if(message.command == 'activate'){
            ractive = true
        }

        //if raddit is toggled, so it's been activted the script proceeds as normal
        if(ractive){
            listenForMessage()
        }
    })

    //since the backgroud script runs upon installation this bit is needed so raddit works right from the start (it's not necessary but it enhances the user experience)
    if(ractive){
        listenForMessage()
    }
} catch(error){
    reportError(error)
}