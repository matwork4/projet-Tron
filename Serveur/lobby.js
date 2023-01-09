const games = require('./games')
const GameDB = require('../data/models/game');


lobby = {
    queue : [], // File d'attente des joueurs. Contient les websockets pour chaque joueur 
    minimumPlayersNumber : 2,
    ids : [], //contient les ids de chaque joueur

    async handle(connection, id){
        // On ajoute le joueur à la file d'attente
        this.queue.push(connection);
        this.ids.push(id);
        let message = {
            type : "lobby",
            isLobbyFull : false
        }
        // Si le lobby est plein :
        if (this.queue.length == this.minimumPlayersNumber){
            let gameDB = new GameDB({
                usersId : this.ids,
                winner : "",
                date : new Date().toJSON()
            })
            gameDB.save()
            //on ajoute une game à l'objet des games en cours à l'"indice" gameDB.id
            games[gameDB.id] = this.queue
            //on envoie aux joueurs du lobby l'id de chaque joueur et l'id de la partie
            message.ids = this.ids;
            message.gameId = gameDB.id;
            message.isLobbyFull = true;
            for (let currentConnection of this.queue){
                currentConnection.send(JSON.stringify(message));
            }
            // On vide la file d'attente et les ids correspondants
            this.queue = [];
            this.ids = [];
        } //sinon le lobby n'est pas encore plein 
        else {
            connection.send(JSON.stringify(message));
        }
    }
}

module.exports = lobby
