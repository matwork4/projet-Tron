// Tableau contenant les connexions à tous les joueurs pour chaque partie.
// Fonctionne comme un dictionnaire avec l'id de la game comme clef
games = {    
    // notifie tous les joueurs d'une partie qu'un joueur a changé de direction
    move(playerId, direction, gameId) {
        let connections = this[gameId]
        let message = {
            type: "move",
            playerId: playerId,
            direction: direction
        }
        for (let connection of connections) {
            connection.send(JSON.stringify(message));
        }
    }
}

module.exports = games