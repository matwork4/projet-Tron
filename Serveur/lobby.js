lobby = {
    queue : [],
    minimumPlayersNumber : 2,

    handle(connection){
        // On ajoute le joueur à la file d'attente
        this.queue.push(connection);
        let message = {
            type : "lobby",
            isLobbyfull : false
        }
        // Si le lobby est plein :
        if (this.queue.length == this.minimumPlayersNumber){
            message.isLobbyfull = true;
            // on envoie un message à chaque joueur dans le lobby
            for (let currentConnection of this.queue){
                currentConnection.send(JSON.stringify(message));
                // ajouter chaque joueur à un objet pour pouvoir continuer
            }
            // On vide la file d'attente
            this.queue = [];
        } else {
            message.isLobbyfull = false;
            for (let currentConnection of this.queue){
                currentConnection.send(JSON.stringify(message));
            }
        }
    }
}

module.exports = lobby