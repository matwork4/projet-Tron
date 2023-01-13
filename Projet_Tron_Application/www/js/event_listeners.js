// Event Listener sur le bouton pour se login
document.getElementById('loginButton').addEventListener('click', function(event){
    let message = {
        type : 'login',
        username : document.getElementById('usernameInput').value,
        password : document.getElementById('passwordInput').value
    }
    ws.send(JSON.stringify(message));
})

// Event listener sur les boutons pour rejoindre un lobby
lobbyButtons = document.getElementsByClassName('joinLobbyButton');
for(let i = 0; i < lobbyButtons.length; i++) {
    lobbyButtons[i].addEventListener("click", function() {
        console.log("join lobby button");
        let message = {
            type : 'joinLobby',
            username : document.getElementById('usernameInput').value,
            id : window.localStorage.getItem('id')
        }
        ws.send(JSON.stringify(message));
    })
  }

// Event listener sur le bouton pour afficher les meilleurs scores
document.getElementById("leaderboardButton").addEventListener('click', function(event){
    let message = {
        type : 'leaderboard'
    }
    ws.send(JSON.stringify(message));
})

// Event listener sur les boutons pour afficher le menu principal
menuButtons = document.getElementsByClassName('menuButton');
for(let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].addEventListener("click", function() {
      ui.displayMainMenuView();
    })
  }