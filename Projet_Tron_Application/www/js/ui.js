// Module qui permet de gérer l'ihm : passage entre les vues, gestion des event listener sur les outons

// Objet global pour gérer l'ihm
ui = {
    // Objet contenant toutes les vues
    views : {
        connection : document.getElementById("connectionView"),
        main_menu : document.getElementById("mainMenuView"),
        game : document.getElementById("vueJeu"),
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

