// Objet global pour gérer l'ihm
ui = {
    // Objet contenant toutes les vues
    views : {
        connection : document.getElementById("vueConnexion"),
        main_menu : document.getElementById("vueMenu"),
        game : document.getElementById("vueJeu"),
        lobby : document.getElementById("vueLobby"),
        leaderboard : document.getElementById("vueScores"),
        result : document.getElementById("vueEcranFin"),
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
        this.views.connection.style.display = "";
    },

    displayMainMenuView(){
        this.hideAllViews();
        this.views.main_menu.style.display = "";
    },    
    
    displayGameView(){
        this.hideAllViews();
        this.views.game.style.display = "";
    },
    
    displayLobbyView(){
        this.hideAllViews();
        this.views.lobby.style.display = "";
    },

    displayLeaderboard(users){
        this.hideAllViews();
        this.views.leaderboard.style.display = "";
        let scoreDom = document.getElementById("scores");
        // on réinitialise le tableau des scores dans le cas où on l'a déjà regardé durant la session
        scoreDom.innerHTML = "";
        //on affiche chaque utilisateur qui a au moins une victoire
        for (let user of users){
            let ligne = document.createElement("p");
            ligne.innerHTML = user.username + ": " + user.nbWins + " wins";
            scoreDom.appendChild(ligne);
        }
    },

    displayResultView(result){
        this.hideAllViews();
        this.views.result.style.display = "";
        document.getElementById("result").innerHTML = result
    },
}

//Affichage au lancement du jeu
ui.hideAllViews();
ui.displayConnectionView();