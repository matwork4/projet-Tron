jeu = {
	sleepDuration: 50,
	run: true,
	chrono: 0,
	startingPositions: [354, 406, 4287, 4339],
	startingDirections: ["S", "O", "E", "N"],
	players: [],
	nbPlayers: 4, //nombre de joueurs max
	indiceMe: null, //quel joueur on est (commence à 0)
	result:"Draw game", // resultat affiché. Sera écrasé en cas de victoire d'un joueur

	/* Initialise le terrain et la liste des joueurs à partir de : 
	-@dim : la dimension du terrain
	-@ids : la liste des ids des joueurs
	Manière normale d'initialiser le jeu
	*/
	init(dim, ids) {
		this.run = true
		this.chrono = 0
		Terrain.initWithDim(dim, dim)
		this.T = Terrain
		this.initPlayersFromIds(ids);
		updateInfoCouleur(this.indiceMe);
		displayTerrain();
	},

	/* Initialise le terrain et la liste des joueurs à partir de :
	-@grille : la grille d'un terrain existant
	-@players : la liste des joueurs de la partie
	 Manière d'initialiser le jeu après s'etre déconnecté. @grille et @players sont envoyés par un autre joueur de la partie
	*/
	initFromOtherPlayer(grille, players){
		this.run = true
		this.chrono = 0
		Terrain.initWithGrid(grille)
		this.T = Terrain
		this.initPlayersFromPlayersList(players);
		updateInfoCouleur(this.indiceMe);
		displayTerrain();
	},

	// init les 4 joueurs lors de la reception des ids des autres joueurs. Initialisation normale
	initPlayersFromIds(ids) {
		this.players=[]
		//création des joueurs humains
		for (let i = 0; i < ids.length; i++) {
			//sa couleur, l'id du bloc, sa direction, si on le controle, si c'est un bot, son id
			this.players.push(new Player(i + 1, this.startingPositions[i], this.startingDirections[i], false, false, ids[i]))
		}
		// création des bots
		for(let i=ids.length ; i<this.nbPlayers ; i++){
		 	this.players.push(new Player(i + 1, this.startingPositions[i], this.startingDirections[i], false, true, 0))
		}
		
		for (let i = 0; i < this.players.length; i++) {
			// on initialise la variable contenant notre joueur (le client)
			if (this.players[i].id == window.localStorage.getItem('id')) {
				this.players[i].isControlled = true;
				this.clientPlayer = this.players[i];
				this.indiceMe = i;
			}
			this.T.addPlayer(this.players[i]);
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
				this.indiceMe = i;
			}
		}
	},

	// fait avancer chacun des joueurs 
	avancePlayers() {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].isAlive) {
				//Si c'est un bot
				if (this.players[i].isBot && this.indiceMe ==0) {
					try{
						this.players[i].choixDirection();
					}catch(error){
						console.log("Erreor wall player "+this.players[i].color);
					}
				}
				//Avance le joueur
				this.T.avancePlayer(this.players[i]);
			}
		}
	},

	async start() {
		console.log("start")
		while (this.run) {
			this.avancePlayers();
			//Fait apparaitre de la tnt chez un le joueur 1
			if(this.indiceMe == 0){
				//this.T.placeTnt(); //décommenter pour tester la tnt
			}
			updateTerrain();
			await sleep(this.sleepDuration);
			updateChrono();
			this.testVictoire();
		}
		ui.displayResultView(this.result);
		//seek("vueEcranFin");
		deleteTerrain();
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
			//Cas d'égalité
			if (nbPlayersAlive == 0) {
				let message = {
					type: "gameOver",
					gameId: window.localStorage.getItem('gameId')
				}
				ws.send(JSON.stringify(message));
				//this.result = "egalite"
			}
			// en cas de victoire du client, on envoie un message au serveur pour qu'il mette a jour le vainqueur dans la bd
			if (this.clientPlayer.isAlive) {
				let message = {
					type: "victory",
					winnerId: window.localStorage.getItem('id'),
					gameId: window.localStorage.getItem('gameId')
				}
				ws.send(JSON.stringify(message));
				this.result = "Victory"
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
		updateArrow("N");
	} else if (event.keyCode === 40) { // Down arrow key
		console.log("test");
		jeu.clientPlayer.setDirection("S");
		updateArrow("S");
	} else if (event.keyCode === 37) { // Left arrow key
		console.log("test");
		jeu.clientPlayer.setDirection("O");
		updateArrow("O");
	} else if (event.keyCode === 39) { // Right arrow key
		console.log("test");
		jeu.clientPlayer.setDirection("E");
		updateArrow("E");
	}
	else return;
	//notification au serveur du changement de direction
	sendMessage("move", jeu.clientPlayer.direction, window.localStorage.getItem('id'),jeu.clientPlayer.color,window.localStorage.getItem('gameId'))

});

// Direction du joueur sur les boutons de l'écran
function pressDirection(dir){
	jeu.players[jeu.indiceMe].setDirection(dir);
	updateArrow(dir);
	sendMessage("move", dir, window.localStorage.getItem('id'),jeu.clientPlayer.color,window.localStorage.getItem('gameId'));
}

function sendMessage(type, direction, playerId, color, gameId){
	let message = {
		type: type,
		direction: direction,
		playerId: playerId,
		color: color,
		gameId: gameId
	}
	ws.send(JSON.stringify(message));
}