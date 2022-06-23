let msgContent;

getMessages();

function getMessages(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(storeMessages);   
}

function storeMessages(object) {
    msgContent = object.data;
    printMessages();
}

function printMessages() {
    //console.log(msgContent[0].type);
    let messageBoard = document.querySelector(".messages");
    //messageBoard.scrollIntoView();   
    messageBoard.innerHTML = "";
     for (let i = 0; i < msgContent.length ; i++) {
        if (msgContent[i].type === "status") {
            let newMessage = `<div class="message typeStatus"><span class="time">(${msgContent[i].time})</span> <span class="strong"> ${msgContent[i].from} </span> ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;            
        }
        if (msgContent[i].type === "private_message") {
            let newMessage = `<div class="message typePrivate"><span class="time">(${msgContent[i].time})</span> <span class="strong"> ${msgContent[i].from} </span> ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;
        }
        if (msgContent[i].type === "message") {
            let newMessage = `<div class="message"><span class="time">(${msgContent[i].time})</span> <span class="strong"> ${msgContent[i].from} </span> para <span class="strong"> ${msgContent[i].to}</span>: ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;
        }
     }
    messageBoard.lastElementChild.scrollIntoView();
}



setInterval(getMessages, 3000);

//let postPromise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", )
