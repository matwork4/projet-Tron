// Tableau contenant des instances de Game
// Fonctionne comme un dictionnaire avec l'id de la game comme clef
games = {    
    // notifie tous les joueurs d'une partie qu'un joueur a changé de direction
    move(color, direction, gameId) {
        let connections = this[gameId].connections
        let message = {
            type: "move",
            color: color,
            direction: direction
        }
        for (let connection of connections) {
            connection.send(JSON.stringify(message));
        }
    }
}

module.exports = games