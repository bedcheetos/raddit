const button = document.getElementById('toggle')

//this script and the main part informs the content script if the user toggles raddit
button.addEventListener("click", () => {
    browser.tabs.query({url: "*://raddle.me/*"}).then((tabs) => {
        tabs.forEach(tab => {
            browser.tabs.sendMessage(tab.id, {
                command: 'toggle'
            })
        });
    })
})