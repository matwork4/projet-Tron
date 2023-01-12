// Module qui permet de gérer l'ihm : passage entre les vues, gestion des event listener sur les outons

// Objet global pour gérer l'ihm
ui = {
    // Objet contenant toutes les vues
    views : {
        connection : document.getElementById("connectionView"),
        main_menu : document.getElementById("mainMenuView"),
        game : document.getElementById("vueJeu"),
        lobby : document.getElementById("lobbyView"),
        leaderboard : document.getElementById("leaderboardView"),
        result : document.getElementById("resultView"),
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

    displayLeaderboard(users){
        this.hideAllViews();
        this.views.leaderboard.style.display = "block";
        let scoreDom = document.getElementById("score");
        // on réinitialise le tableau des scores dans le cas où on l'a déjà regardé durant la session
        scoreDom.innerHTML =""
        //on affiche chaque utilisateur qui a au moins une victoire
        for (let user of users){
            scoreDom.innerHTML += user.username + " : " + user.nbWins + "</br>"
        }
    },

    displayResultView(result){
        this.hideAllViews();
        this.views.result.style.display = "block";
        document.getElementById("result").innerHTML = result
    },
}

