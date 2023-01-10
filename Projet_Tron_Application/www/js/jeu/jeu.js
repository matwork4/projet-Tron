jeu = {
	sleepDuration: 400,//60,
	run: true,
	chrono: 0,
	startingPositions: [103, 129, 961, 987],
	startingDirections: ["S", "O", "E", "N"],
	players: [],

	/* Initialise le terrain et la liste des joueurs à partir de : 
	-@dim : la dimension du terrain
	-@ids : la liste des ids des joueurs
	Manière normale d'initialiser le jeu
	*/
	init(dim, ids) {
		Terrain.initWithDim(dim, dim)
		this.T = Terrain
		this.initPlayersFromIds(ids);
		displayTerrain();
	},

	/* Initialise le terrain et la liste des joueurs à partir de :
	-@grille : la grille d'un terrain existant
	-@players : la liste des joueurs de la partie
	 Manière d'initialiser le jeu après s'etre déconnecté. @grille et @players sont envoyés par un autre joueur de la partie
	*/
	initFromOtherPlayer(grille, players){
		Terrain.initWithGrid(grille)
		this.T = Terrain
		this.initPlayersFromPlayersList(players);
		displayTerrain();
	},

	// init les 4 joueurs lors de la reception des ids des autres joueurs. Initialisation normale
	initPlayersFromIds(ids) {
		for (let i = 0; i < ids.length; i++) {
			//sa couleur, l'id du bloc, sa direction, si on le controle, si c'est un bot, son id
			this.players.push(new Player(i + 1, this.startingPositions[i], this.startingDirections[i], false, false, ids[i]))
		}
		for (let i = 0; i < this.players.length; i++) {
			this.T.addPlayer(this.players[i]);
			// on initialise la variable contenant notre joueur (le client)
			if (this.players[i].id == window.localStorage.getItem('id')) {
				this.clientPlayer = this.players[i];
			}
		}
	},

	// Initialise les joueurs en utilisant la liste des joueurs d'un autre client. Utilisée en cas de déconnexion du client en pleine partie
	initPlayersFromPlayersList(players) {
		this.players=[]
		for (p of players) {
			//sa couleur, l'id du bloc, sa direction, si on le controle, si c'est un bot, son id
			this.players.push(new Player(p.color, p.idBlock, p.direction, p.isControlled, p.isBot, p.id))
		}
		for (let i = 0; i < this.players.length; i++) {
			this.T.addPlayer(this.players[i]);
			// on initialise la variable contenant notre joueur (le client)
			if (this.players[i].id == window.localStorage.getItem('id')) {
				this.clientPlayer = this.players[i];
			}
		}
	},

	// fait avancer chacun des joueurs 
	avancePlayers() {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive) {
				//Si c'est un bot
				if (this.players[i].isBot) {
					this.players[i].choixDirection();
					//Si c'est le joueur
				}
				//Avance le joueur
				this.T.avancePlayer(this.players[i]);
			}
		}
	},

	async start() {
		while (this.run) {
			this.avancePlayers();
			deleteTerrain();
			displayTerrain();
			await sleep(this.sleepDuration);
			updateChrono();
			this.testVictoire();
		}
	},

	testVictoire() {
		let nbPlayersAlive = 0;
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive) {
				nbPlayersAlive++;
			}
		}
		//si il reste moins de 2 joueurs en vie, on stop
		if (nbPlayersAlive < 2) {
			this.run = false;
			console.log("Jeu terminé");
			if (nbPlayersAlive == 0) {
				console.log("Egalité !");
			}
			// en cas de victoire du client, on envoie un message au serveur pour qu'il mette a jour le vainqueur dans la bd
			if (this.clientPlayer.isAlive) {
				let message = {
					type: "victory",
					winnerId: window.localStorage.getItem('id'),
					gameId: window.localStorage.getItem('gameId')
				}
				ws.send(JSON.stringify(message));
			}
			window.localStorage.removeItem('gameId'); //pourra etre utile en cas de fermeture du client et tentative de reconnexion a la partie
		}
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

//Event listeners sur les boutons de direction
document.addEventListener("keydown", function (event) {
	if (!jeu.run) { 
		return; 
	}
	//changement de direction
	if (event.keyCode === 38 && jeu.clientPlayer.direction != "S") { // Up arrow key
		jeu.clientPlayer.setDirection("N");
	} else if (event.keyCode === 40) { // Down arrow key
		console.log("test");
		jeu.clientPlayer.setDirection("S");
	} else if (event.keyCode === 37) { // Left arrow key
		console.log("test");
		jeu.clientPlayer.setDirection("O");
	} else if (event.keyCode === 39) { // Right arrow key
		console.log("test");
		jeu.clientPlayer.setDirection("E");
	}
	else return;
	//notification au serveur du changement de direction
	let message = {
		type: "move",
		direction: jeu.clientPlayer.direction,
		playerId: window.localStorage.getItem('id'),
		gameId: window.localStorage.getItem('gameId')
	}
	ws.send(JSON.stringify(message));
});