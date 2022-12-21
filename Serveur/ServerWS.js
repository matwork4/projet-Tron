const authentication = require('./authentication')
const lobby = require('./lobby')
/********************  MONGOOSE *********************/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TronDB')  
// on peut accéder aux données de la collection users grace au model User:
const User = require('../data/models/user')
// pareil pour Game:
const Game = require('../data/models/game');
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
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    // Ecrire ici le code qui indique ce que l'on fait :
    // -en cas de réception de message 
    connection.on('message', function(clientMessage) {
        // récuperation du message du client sous forme d'object
        let clientMessageData = JSON.parse(clientMessage.utf8Data);

        // Switch selon le type du message envoyé par le client (tentative de login, deplacement de la moto...)
        switch (clientMessageData.type) {
            // TENTATIVE DE LOGIN
            case 'login' :
                // on gère la tentative d'authentification et le serveur envoie le résultat de cette tentative au client.
                // authentication.handle() est async et renvoie donc une Promise. Pour pouvoir utiliser ce que la fonction retourne, on utilise then
                authentication.handle(clientMessageData).then(response => {
                    connection.send(response)
                });
                break;
            
            // DEMANDE POUR REJOINDRE UN LOBBY
            case 'joinLobby' :
                lobby.handle(connection)
                break
        }
    });

    // -en cas de fermeture de la WebSocket
    connection.on('close', function(reasonCode, description) {
        connection.send("Le client a quitté")
    });
});