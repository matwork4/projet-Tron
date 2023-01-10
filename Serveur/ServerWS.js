var authentication = require('./authentication')
var lobby = require('./lobby')
const games = require('./games')

/********************  MONGOOSE *********************/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TronDB')
// on peut accéder aux données de la collection users grace au model User:
const User = require('../data/models/user')
// pareil pour les games:
const GameDB = require('../data/models/game');
//Test d'accès aux données (il faut avoir seed d'abord, cf README)
// run()
// async function run(){    
//     bibi = await User.findOne({username : "bibi"})
//     console.log(bibi)
// }
/****************************************************/

//SERVEUR
const http = require('http');
const server = http.createServer();
server.listen(9898); // On écoute sur le port 9898

// Création du server WebSocket qui utilise le serveur précédent
const WebSocketServer = require('websocket').server;
const wsServer = new WebSocketServer({
    httpServer: server
});
console.log("serveur lancé")

// Mise en place des événements WebSockets
wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);
    // Réception d'un message 
    connection.on('message', function (clientMessage) {
        // récuperation du message du client sous forme d'object
        let clientMessageData = JSON.parse(clientMessage.utf8Data);
        //réponse eventuelle du serveur
        let message = {}

        // Switch selon le type du message envoyé par le client (tentative de login, deplacement de la moto...)
        switch (clientMessageData.type) {
            // TENTATIVE DE LOGIN
            case 'login':
                // le serveur gère la tentative d'authentification et envoie le résultat au client.
                // authentication.handle() est async et renvoie donc une Promise. Pour pouvoir utiliser ce que la fonction retourne, on utilise then
                authentication.handle(clientMessageData).then(response => {
                    connection.send(response)
                });
                break;

            // DEMANDE POUR REJOINDRE UN LOBBY
            case 'joinLobby':
                lobby.handle(connection, clientMessageData.id)
                break

            // DEPLACEMENT D'UN JOUEUR
            case 'move':
                //notifie touts les autres joueurs dans la game du changement de direction
                games.move(clientMessageData.playerId, clientMessageData.direction, clientMessageData.gameId);
                break;

            // VICTOIRE D'UN JOUEUR
            case "victory":
                // Mise à jour du vainqueur de la partie dans la bd
                GameDB.findById(clientMessageData.gameId, function (err, gameDB) {
                    gameDB.winner = clientMessageData.winnerId;
                    gameDB.save();
                });
                // Mise a jour du nombre de victoires du vainqueur dans la bd
                User.findById(clientMessageData.winnerId, function (err, user) {
                    user.nbWins++;
                    user.save();
                });
                games[clientMessageData.gameId].isOver = true;
                break;

            // UN JOUEUR VEUT REVENIR DANS UNE PARTIE APRES DECONNEXION
            case "returnToGame":
                // on récupère l'objet qui contient les connexions aux autre joueurs de la partie
                let game = games[clientMessageData.gameId]
                if (game != undefined && !game.isOver) {
                    message = {
                        type: "askGame",
                    }
                    for (let i = 0; i < game.ids.length; i++) {
                        //si c'est bien un client différent de celui qui s'est déconnecté, on lui demande ses infos du jeu
                        if (game.ids[i] != clientMessageData.playerId) {
                            game.connections[i].send(JSON.stringify(message));
                        }
                    }
                    //on enregistre la connection au joueur qui veut se reconnecter a la partie
                    comingBackPlayerConnection = connection
                    game.connections.push(connection)
                    game.ids.push(clientMessageData.playerId)
                }
                break;

            // UN CLIENT A ENVOYE L'ETAT DE SON JEU
            case "sendGame":
                message = {
                    type: "sendGame",
                    grille: clientMessageData.grille,
                    players: clientMessageData.players
                }
                // le serveur transmet ces informations au client qui souhaite se reconnecter à la partie
                comingBackPlayerConnection.send(JSON.stringify(message))
                break;
        }
    });

    // -en cas de fermeture de la WebSocket
    connection.on('close', function (reasonCode, description) {
        connection.send("Le client a quitté")
    });
});