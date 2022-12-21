// Objet global pour gérer l'interface
ui = {
    // Objet contenant toutes les vues
    views : {
        connection : document.getElementById("connectionView"),
        main_menu : document.getElementById("mainMenuView"),
        game : document.getElementById("gameView"),
        lobby : document.getElementById("lobbyView")
    },

    /*
    * Rend toutes les vues invisibles
    */
    hideAllViews(){
        for (let view of Object.values(this.views)){
            view.style.display = "none";
        }
    },

    displayConnectionView(){
        this.hideAllViews();
        this.views.connection.style.display = "block";
    },

    displayMainMenuView(){
        this.hideAllViews();
        this.views.main_menu.style.display = "block";
    },    
    
    displayGameView(){
        this.hideAllViews();
        this.views.game.style.display = "block";
    },
    
    displayLobbyView(){
        this.hideAllViews();
        this.views.lobby.style.display = "block";
    },
}

// Event Listener pour se login
document.getElementById('loginButton').addEventListener('click', function(event){
    let message = {
        type : 'login',
        username : document.getElementById('usernameInput').value,
        password : document.getElementById('passwordInput').value
    }
    ws.send(JSON.stringify(message));
})

// Event listener pour rejoindre un lobby
document.getElementById("joinLobbyButton").addEventListener('click', function(event){
    let message = {
        type : 'joinLobby',
        username : document.getElementById('usernameInput').value
    }
    ws.send(JSON.stringify(message));
})