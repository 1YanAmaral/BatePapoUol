let username;

function askUsername(){
    username = {
        name: prompt("Qual o seu lindo nome?")
    };
}

askUsername();

function sendUsername(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", username);
    promise.catch(catchError);
    promise.then(getMessages);
}

sendUsername();

function catchError(error) {
    if (error.response.status === 400) {
        alert("Nome de usuário indisponível!");
        askUsername();
    }
}


function getMessages(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(storeMessages);   
}

function storeMessages(object) {
    msgContent = object.data;
    printMessages();
}

function printMessages() {
    let messageBoard = document.querySelector(".messages");
    messageBoard.innerHTML = "";
     for (let i = 0; i < msgContent.length ; i++) {
        if (msgContent[i].type === "status") {
            let newMessage = `<div class="message typeStatus"><span class="time">(${msgContent[i].time})</span> <span class="strong"> ${msgContent[i].from} </span> ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;            
        }
        if (msgContent[i].type === "private_message" && msgContent[i].to === username) {
            let newMessage = `<div class="message typePrivate"><span class="time">(${msgContent[i].time})</span> <span class="strong"> ${msgContent[i].from}</span> para <span class="strong">${msgContent[i].to}: </span>${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;
        }
        if (msgContent[i].type === "message") {
            let newMessage = `<div class="message"><span class="time">(${msgContent[i].time})</span> <span class="strong"> ${msgContent[i].from} </span> para <span class="strong"> ${msgContent[i].to}:</span> ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;
        }
     }
    messageBoard.lastElementChild.scrollIntoView();
}

setInterval(getMessages, 3000);
setInterval(sustainConnection, 3000);

function sendMessage() {
    const msg = document.querySelector("input").value;
    const objMessage = {
        from: username.name,
        to: "Todos",
        text: msg,
        type: "message"         
    };

    console.log(objMessage);
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objMessage);
    promise.then(getMessages);
    promise.catch(loadPage);
}


function loadPage (){
    document.location.reload(true);
}

function sustainConnection() {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", username);
    promise.then(getMessages);
    
}

