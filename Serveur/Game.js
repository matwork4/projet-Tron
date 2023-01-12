//Représente une partie
module.exports = class Game {
    constructor(connections, ids){
        this.connections = connections; // connections à chaque joueur de la partie
        this.ids = ids; //ids de chaque joueur
        this.isOver = false; // est ce que la partie est terminée
    }
}