
const dimX = 34, dimY = 34;
const sleepDuration = 60;
var run = true;
var chrono = 0;

var T = new Terrain(dimX,dimY);

var players = [];
initPlayers();

// init les 4 joueurs
function initPlayers(){
	//sa couleur, l'id du bloc, sa direction, si on le controle, si c'est un bot
	players.push(new Player(1,103,"S", true, false)); 
	players.push(new Player(2,129,"O", false, true));
	players.push(new Player(3,961,"E", false, true));
	players.push(new Player(4,987,"N", false, true));
	for(let i=0; i<players.length; i++){
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

