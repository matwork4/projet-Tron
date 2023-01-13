const games = require('./games')
const GameDB = require('../data/models/game');
var Game = require('./Game');

// Objet qui permet de gérer le lobby
lobby = {
    queue : [], // File d'attente des joueurs. Contient les websockets pour chaque joueur 
    minimumPlayersNumber : 2,
    dimensionTerrain : 70,
    ids : [], //contient les ids de chaque joueur

    // Gere une demande de connection d'un client à un lobby
    async handle(connection, id){

        let message = {
            type : "lobby",
            isLobbyFull : false
        }
        //joueur deja dans le lobby
        /*
        if(this.ids.includes(id)){
            console.log("joueur deja connecte");
            connection.send(JSON.stringify(message));
            return ;
        }
        */
        // On ajoute le joueur à la file d'attente
        this.queue.push(connection);
        this.ids.push(id);

        // Si le lobby est plein :
        if (this.queue.length == this.minimumPlayersNumber){
            //on cré une game dans la bd
            let gameDB = new GameDB({
                usersId : this.ids,
                winner : "",
                date : new Date().toJSON()
            })
            gameDB.save()
            //on ajoute les connections aux clients et les ids correspondants à l'objet des games en cours à l'"indice" gameDB.id
            games[gameDB.id] = new Game(this.queue, this.ids)
            //on envoie aux joueurs du lobby l'id de chaque joueur et l'id de la partie pour qu'ils puissent créer la partie de leur coté
            message.ids = this.ids;
            message.gameId = gameDB.id;
            message.dim = this.dimensionTerrain
            message.isLobbyFull = true;
            for (let currentConnection of this.queue){
                currentConnection.send(JSON.stringify(message));
            }
            // On vide la file d'attente et les ids 
            this.queue = [];
            this.ids = [];
        } //sinon le lobby n'est pas encore plein 
        else {
            connection.send(JSON.stringify(message));
        }
    }
}

module.exports = lobby
