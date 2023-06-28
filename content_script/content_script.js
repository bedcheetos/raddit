//this function loads the images or more specific handles their loading as they appear on the screen
//it also changes the attributes so it's easier for the extension to deal with the images
const lazyLoad = (target, src) => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const img = entry.target

                img.removeAttribute('class')
                img.setAttribute('class', "submission__photo")
                img.setAttribute('loading', 'lazy')
                img.setAttribute('src', src)
                img.removeAttribute('height')
                img.removeAttribute('width')
                img.removeAttribute('srcset')
                observer.disconnect()
            }
        })
    },
    {
        rootMargin: "1024px"
    })
    io.observe(target)
}

//this function replaces the side's image sources
function postHandler(post, postNumber){
    if(post.href.endsWith(".png") || post.href.endsWith(".jpg") || post.href.endsWith(".gif") || post.href.endsWith(".webp")){
        lazyLoad(post.childNodes[0], post.href)
        let div = document.createElement("div")

        div.className = "submission__link-title"
        div.appendChild(document.createTextNode(post.innerText))

        //because sometimes there are images linked with post.href but not uploaded/displayed,
        //since we only need img elements we ask for exactly that
        if(post.firstChild.nodeName == "IMG"){
            //post.childNodes[0] is the old text
            //post.childNodes[1] is the old image
            //(since the css file specifies flex-direction: column it has to be the other way around)
            post.removeChild(post.childNodes[1])
            post.insertBefore(div, post.childNodes[0])
        }
    }
    else if(post.childElementCount >= 1){
        let numberOfNodes = post.childNodes.length
        let content = post.innerText
        let div = document.createElement("div")

        //removing all nodes from this post, which has no image to display
        for(let i = 0; i < numberOfNodes; i++){
            //the index is always 0 because the list gets updated everytime an element gets removed, post.childNodes[0] acts as a list-head
            post.removeChild(post.childNodes[0])
        }

        div.className = "submission__link-title"
        div.appendChild(document.createTextNode(content))

        post.appendChild(div)
    }
    
}

function runScript(){
    browser.runtime.sendMessage({command: "inject Css"})

    let anchor = document.getElementsByClassName("submission__link")
    //the html of the document needs to be changed as well, which is handled by this for-loop
    for(let i = 0; i <  document.getElementsByClassName("submission__link").length ; i++){
        postHandler(anchor[i])
    }

    //replacing the link of each post's anchor (which is the source of the pictures) with the link to their coment section
    //j is the counting variable for the anchor elements, since there are j anchors, which are independent from the commentLinks (especially in number)
    let j = 0
    let commentLink = document.getElementsByClassName("text-sm")

    for(let i = 0; i < document.getElementsByClassName("text-sm").length; i++){
        if(commentLink[i].nodeName == "A" && commentLink[i].className.startsWith("text-sm")){
            anchor[j].setAttribute('href', commentLink[i].href)
            j++
        }
    }
}

//start of script


//first the background script is messaged, asking for the status; wthere raddit is active or not
browser.runtime.sendMessage({command: 'get active'}).then(response => {
    let active = response.scriptActive

    browser.runtime.onMessage.addListener((message) => {
        if(message.command == 'toggle' && !active){
            active = true
            browser.runtime.sendMessage({command: 'activate'})
            runScript()
        }
        else if(message.command == 'toggle' && active){
            active = false
            browser.runtime.sendMessage({command: 'deactivate'})
        }
    })

    if(active){
        runScript()
    }
})


    