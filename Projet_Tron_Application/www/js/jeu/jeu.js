const dimX = 34, dimY = 34;
const sleepDuration = 60;
var run = true;
var chrono = 0;

var T = new Terrain(dimX, dimY);
startingPositions = [103, 129, 961, 987];
startingDirections = ["S", "O", "E", "N"];
var players = [];
initPlayers();

// init les 4 joueurs
function initPlayers(ids = []) {
	//sa couleur, l'id du bloc, sa direction, si on le controle, si c'est un bot
	if (ids != [])
		for (let i = 0; i < ids.length; i++) {
			players.push(new Player(i + 1, startingPositions[i], startingDirections[i], false, false, ids[i]))
		}
	else {
		players.push(new Player(1, 103, "S", true, false));
		players.push(new Player(2, 129, "O", false, true));
		players.push(new Player(3, 961, "E", false, true));
		players.push(new Player(4, 987, "N", false, true));
	}
	for (let i = 0; i < players.length; i++) {
		T.addPlayer(players[i]);
		// on initialise la variable contenant notre joueur (le client)
		if (players[i].id == window.localStorage.getItem('id')) {
			clientPlayer = players[i];
		}
	}
}

// fait avancer chacun des joueurs 
function avancePlayers() {
	for (let i = 0; i < players.length; i++) {
		if (players[i].isAlive) {

			//Si c'est un bot
			if (players[i].isBot) {
				players[i].choixDirection();
				//Si c'est le joueur
			} else if (players[i].isControlled) {
				/* ICI 
				 * appeler une fonction qui change la direction du joueur
				*/
			}

			//Avance le joueur
			T.avancePlayer(players[i]);
		}
	}
}

document.addEventListener("keydown", function (event) {
	if (!run) return;
	//changement de direction
	if (event.keyCode === 38 && clientPlayer.direction != "S") { // Up arrow key
		clientPlayer.setDirection("N");
	} else if (event.keyCode === 40) { // Down arrow key
		console.log("test");
		clientPlayer.setDirection("S");
	} else if (event.keyCode === 37) { // Left arrow key
		console.log("test");
		clientPlayer.setDirection("O");
	} else if (event.keyCode === 39) { // Right arrow key
		console.log("test");
		clientPlayer.setDirection("E");
	}
	else return;
	//notification au serveur du changement de direction
	let message = {
		type: "move",
		direction: clientPlayer.direction,
		playerId: window.localStorage.getItem('id'),
		gameId : window.localStorage.getItem('gameId') 
	}
	ws.send(JSON.stringify(message));
});




// affiche le terrain dans le DOM
displayTerrain();



async function start() {
	while (run) {
		avancePlayers();
		deleteTerrain();
		displayTerrain();
		await sleep(sleepDuration);
		updateChrono();
		testVictoire();
	}
}



function testVictoire() {
	let nbPlayersAlive = 0;
	for (let i = 0; i < players.length; i++) {
		if (players[i].isAlive) {
			nbPlayersAlive++;
		}
	}
	//si il reste moins de 2 joueurs en vie, on stop
	if (nbPlayersAlive < 2) {
		run = false;
		console.log("Jeu terminé");
		if (nbPlayersAlive == 0) {
			console.log("Egalité !");
		}
		// en cas de victoire du client, on envoie un message au serveur pour q'il mette a jour le vainqueur dans la bd
		if (clientPlayer.isAlive){
			let message = {
				type : "victory",
				winnerId : window.localStorage.getItem('id'),
				gameId : window.localStorage.getItem('gameId') 
			}
			console.log("Infos message à envoyer : " + message.winnerId + " a gagne la partie " + message.gameId)
			ws.send(JSON.stringify(message));
		}
		window.localStorage.removeItem('gameId'); //pourrait etre utile en cas de fermeture du client et tentative de reconnexion a la partie
	}
}









/* Sleep function
 * use : await sleep(<duration>);
*/
const sleep = ms => new Promise(r => setTimeout(r, ms));


/* random int function
*/
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

