//MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TronDB')  
// on peut accéder aux données de la collection users grace au model User:
const User = require('./data/user')
// pareil pour Game:
const Game = require('./data/game');

//Test d'accès aux données (il faut avoir seed d'abord cf README)
run()
async function run(){    
    bibi = await User.findOne({username : "bibi"})
    console.log(bibi)
}

//SERVEUR
const http = require('http');
const server = http.createServer();
server.listen(9898); // On écoute sur le port 9898

// Création du server WebSocket qui utilise le serveur précédent
const WebSocketServer = require('websocket').server;
const wsServer = new WebSocketServer({
    httpServer: server
});

// Mise en place des événements WebSockets
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    // Ecrire ici le code qui indique ce que l'on fait en cas de
    // réception de message et en cas de fermeture de la WebSocket
    connection.on('message', function(message) {
        connection.send("Message reçu : " + message.utf8Data);
    });
    connection.on('close', function(reasonCode, description) {
        connection.send("Le client a quitté")
    });
});