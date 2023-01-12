const dimX = 34, dimY = 34;
const sleepDuration = 65;
var run = true;
var chrono = 0;
var nbPlayers = 4; //nombre de joueurs max
var indiceMe = null; //quel joueur on est (commence à 0)


var T = new Terrain(dimX,dimY);

// Variable a modifier depuis le lobby
var playersFromLobby = ["ki","bot","bot","me"];

var players = [];
initPlayers();
updateInfoCouleur(indiceMe);

// init les 4 joueurs
function initPlayers(){
	//sa couleur, l'id du bloc, sa direction, si on le controle, si c'est un bot

	players.push(new Player(1,103,"S", false, false)); 
	players.push(new Player(2,129,"O", false, false));
	players.push(new Player(3,961,"E", false, false));
	players.push(new Player(4,987,"N", false, false));

	for(let i=0; i<nbPlayers; i++){
		if(playersFromLobby[i] == "me"){
			players[i].isControlled = true;
			indiceMe = i;
		}else if(playersFromLobby[i] == "bot"){
			players[i].isBot = true;
		}

		T.addPlayer(players[i]);
	}
}

// fait avancer chacun des joueurs 
function avancePlayers(){
	for(let i=0; i<players.length; i++){
		if(players[i].isAlive){

			//Si c'est un bot
			if(players[i].isBot){
				players[i].choixDirection();
			//Si c'est le joueur
			}else if(players[i].isControlled){
				/* ICI 
				 * appeler une fonction qui change la direction du joueur
				*/
			}

			//Avance le joueur
			T.avancePlayer(players[i]);
		}
	}
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38 && players[0].direction != "S") { // Up arrow key
      players[0].setDirection("N");
    } else if (event.keyCode === 40) { // Down arrow key
		console.log("test");
		players[0].setDirection("S");
    } else if (event.keyCode === 37) { // Left arrow key
		console.log("test");
		players[0].setDirection("O");
    } else if (event.keyCode === 39) { // Right arrow key
		console.log("test");
		players[0].setDirection("E");
    }
  });


// Direction du joueur au clavier
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38 && players[indiceMe].direction != "S") { 
      players[indiceMe].setDirection("N");
      updateArrow("N");
    } else if (event.keyCode === 40 && players[indiceMe].direction != "N") { 
		players[indiceMe].setDirection("S");
		updateArrow("S");
    } else if (event.keyCode === 37 && players[indiceMe].direction != "E") { 
		players[indiceMe].setDirection("O");
		updateArrow("O");
    } else if (event.keyCode === 39 && players[indiceMe].direction != "O") { 
		players[indiceMe].setDirection("E");
		updateArrow("E");
    }
  });

// Direction du joueur sur les boutons de l'écran
function pressDirection(dir){
	players[indiceMe].setDirection(dir);
	updateArrow(dir);
}




// affiche le terrain dans le DOM
displayTerrain();



async function start(){
	while(run){
		avancePlayers();
		deleteTerrain();
		displayTerrain();
		await sleep(sleepDuration);
		updateChrono();
		testVictoire();
	}
}



function testVictoire(){
	let nbPlayersAlive = 0;
	for(let i=0; i<players.length; i++){
		if(players[i].isAlive){
			nbPlayersAlive++;
		}
	}
	//si il reste moins de 2 joueurs en vie, on stop
	if(nbPlayersAlive<2){
		run = false;
		console.log("Jeu terminé");
		if(nbPlayersAlive == 0){
			console.log("Egalité !");
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