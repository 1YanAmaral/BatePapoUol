let username;


function sendUsername(){
    username = {
        name: document.querySelector(".userName").value
    };
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", username);
    promise.catch(catchError);
    promise.then(hideLoginScreen);
    promise.then(getMessages);
}


function catchError(error) {
    if (error.response.status === 400) {
        alert("Nome de usuário indisponível!");
        hideLoader();
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
            let newMessage = `<div class="message typeStatus"><span class="time">(${msgContent[i].time})</span> <span class="from"> ${msgContent[i].from} </span> ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;            
        }
        if (msgContent[i].type === "private_message" && msgContent[i].to === username) {
            let newMessage = `<div class="message typePrivate"><span class="time">(${msgContent[i].time})</span> <span class="from"> ${msgContent[i].from}</span> para <span class="to">${msgContent[i].to}: </span>${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;
        }
        if (msgContent[i].type === "message") {
            let newMessage = `<div class="message"><span class="time">(${msgContent[i].time})</span> <span class="from"> ${msgContent[i].from} </span> para <span class="to"> ${msgContent[i].to}:</span> ${msgContent[i].text}</div>`;
            messageBoard.innerHTML += newMessage;
        }
     }
    messageBoard.lastElementChild.scrollIntoView();
}

setInterval(getMessages, 3000);
setInterval(sustainConnection, 5000);

function sendMessage() {
    let msg = document.querySelector(".msg").value;
    const objMessage = {
        from: username.name,
        to: "Todos",
        text: msg,
        type: "message"         
    };

    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objMessage);
    promise.then(getMessages);
    promise.catch(loadPage);
    document.querySelector(".msg").value = " ";
}


function loadPage (){
    document.location.reload(true);
}

function sustainConnection() {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", username);
    promise.then(getMessages);
    
}

function showParticipants() {
    document.querySelector(".options").classList.remove("hidden");
    document.querySelector(".background").classList.remove("hidden");

}

function hideParticipants () {
    document.querySelector(".options").classList.add("hidden");
    document.querySelector(".background").classList.add("hidden");
}

function getParticipants(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(storeParticipants);   
    
}

function storeParticipants(object) {
    objContent = object.data;
    printParticipants();
    
}

function printParticipants() {
    let participantsList = document.querySelector("ul");
    participantsList.innerHTML = `<li><ion-icon name="people"></ion-icon>Todos</li>`;
    for (let i = 0; i <= objContent.length ; i++) {
        participantsList.innerHTML += `<li><ion-icon name="person-circle"></ion-icon>${objContent[i].name}</li>`
        
    }
   
}

function hideLoginScreen (){
    document.querySelector(".loginScreen").classList.add("hidden");
}

function showLoader (){
    document.querySelector(".loader").classList.remove("hidden");
    document.querySelector(".loginIn").classList.remove("hidden");
    document.querySelector(".userName").classList.add("hidden");
    document.querySelector("button").classList.add("hidden");
}

function hideLoader() {
    document.querySelector(".loader").classList.add("hidden");
    document.querySelector(".loginIn").classList.add("hidden");
    document.querySelector(".userName").classList.remove("hidden");
    document.querySelector("button").classList.remove("hidden");
}