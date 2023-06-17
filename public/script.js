const socket = io();
let username = "";

document.getElementById("join-button").addEventListener("click", (event) =>{
    event.preventDefault();
    username = document.getElementById("username-input").value;
    if(username.trim() != ""){
        document.querySelector(".form-username").style.display = 'none';
        document.querySelector(".chat-room-container").style.display = 'block';
        document.querySelector('.chatroom-header').innerHTML = `Chatroom - ${username}`
    }
})

document.getElementById('send-btn').addEventListener('click', (event)=>{
    event.preventDefault();
    const data = {
        username: username,
        message: (document.getElementById('message-input').value).trim(),
    }
    // emitting with 'message' event
    socket.emit('message', data);
    addMessage(data,true) //true -> sent
})

// recieving the message
    socket.on('message', (data) =>{
        if(data.username !== username){
            addMessage(data, false);
        }
    })


//this function is just for appending message

function addMessage(data, check){
    // check -> true for sent
    // check -> false for recieved
    var msgDiv = document.createElement('div');
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if(check){
        msgDiv.setAttribute('class', 'message sent')
    }else{
        msgDiv.setAttribute('class', 'message recieved')
    }
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value = "";
}