
// Event Listener sur le bouton pour se login
document.getElementById('loginButton').addEventListener('click', function(event){
    let message = {
        type : 'login',
        username : document.getElementById('usernameInput').value,
        password : document.getElementById('passwordInput').value
    }
    ws.send(JSON.stringify(message));
})

// Event listener sur le bouton pour rejoindre un lobby
document.getElementById("joinLobbyButton").addEventListener('click', function(event){
    let message = {
        type : 'joinLobby',
        username : document.getElementById('usernameInput').value,
        id : window.localStorage.getItem('id')
    }
    ws.send(JSON.stringify(message));
})


