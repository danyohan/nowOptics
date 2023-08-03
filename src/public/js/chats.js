const socket = io.connect();

function SendData() {

    const message = document.querySelector("#message").value;
    if (message.length > 0) {
        socket.emit("message", { message, from: getUserName()});
    }

    document.querySelector("#message").value = "";
}

socket.on("message", ({ from, message }) => {
    const messageElement = document.createElement("p");
    messageElement.innerText = `${from}: ${message}`;
    document.querySelector("#messagesList").appendChild(messageElement);
});

function getUserName()
{
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');  
}