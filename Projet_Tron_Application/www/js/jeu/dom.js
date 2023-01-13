/* Fonctions qui modifient le DOM html
*/

// affiche le terrain dans le DOM
function displayTerrain(){
	let terrain = document.createElement("table");
	terrain.setAttribute('id',"childTerrain");

		for(let i=0; i<jeu.T.dimY-1; i++){
			let ligne = document.createElement("tr");
			for(let j=0; j<jeu.T.dimX-1; j++){
				let col = document.createElement("td");
				//col.innerHTML = "0";

				//console.log("jeu.T.tab["+i+"]["+j+"].isWall = "+jeu.T.tab[i][j].isWall);
				if(jeu.T.tab[i][j].isWall){
					col.setAttribute('class', "wall");
				}
				
				if(jeu.T.tab[i][j].isPlayer){
					if(jeu.T.tab[i][j].color == 1){
						col.setAttribute('class', "playerBlue");
					}else if(jeu.T.tab[i][j].color == 2){
						col.setAttribute('class', "playerRed");
					}else if(jeu.T.tab[i][j].color == 3){
						col.setAttribute('class', "playerYellow");
					}else if(jeu.T.tab[i][j].color == 4){
						col.setAttribute('class', "playerGreen");
					}
				}else{
					if(jeu.T.tab[i][j].color == 1){
						col.setAttribute('class', "blue");
					}else if(jeu.T.tab[i][j].color == 2){
						col.setAttribute('class', "red");
					}else if(jeu.T.tab[i][j].color == 3){
						col.setAttribute('class', "yellow");
					}else if(jeu.T.tab[i][j].color == 4){
						col.setAttribute('class', "green");
					}
				}

				col.setAttribute('id', 'block'+jeu.T.tab[i][j].id);
				//col.setAttribute('onclick','clickBlock('+jeu.T.tab[i][j].id+')');

				ligne.appendChild(col);
			}
			terrain.appendChild(ligne);
		}

		document.getElementById("terrain").appendChild(terrain);
}

//Supprime le terrain
function deleteTerrain(){
	document.getElementById("childTerrain").remove();
}

// met a jour les classes du terrain
function updateTerrain(){

	let col;

	for(let i=0; i<jeu.T.dimY-1; i++){
		for(let j=0; j<jeu.T.dimX-1; j++){

			if(jeu.T.tab[i][j].isPlayer){
				if(jeu.T.tab[i][j].color == 1){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "playerBlue");
				}else if(jeu.T.tab[i][j].color == 2){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "playerRed");
				}else if(jeu.T.tab[i][j].color == 3){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "playerYellow");
				}else if(jeu.T.tab[i][j].color == 4){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "playerGreen");
				}
			}else{
				if(jeu.T.tab[i][j].color == 1){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "blue");
				}else if(jeu.T.tab[i][j].color == 2){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "red");
				}else if(jeu.T.tab[i][j].color == 3){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "yellow");
				}else if(jeu.T.tab[i][j].color == 4){
					col = document.getElementById("block"+jeu.T.tab[i][j].id);
					col.setAttribute('class', "green");
				}
			}
		}
	}
}

function updateChrono(){
	jeu.chrono+=jeu.sleepDuration+49; //on estime à 49ms le temps d'exécution de chaque boucle
	document.getElementById("chrono").innerHTML = "Temps = "+(jeu.chrono/1000)+" s";

}

function updateArrow(dir){

	var haut = document.getElementById("btn_haut");
	var bas = document.getElementById("btn_bas");
	var gauche = document.getElementById("btn_gauche");
	var droite = document.getElementById("btn_droite");

	haut.style.boxShadow = "";
	bas.style.boxShadow = "";
	gauche.style.boxShadow = "";
	droite.style.boxShadow = "";

	if(dir == "N"){
		haut.style.boxShadow = "2px 2px 10px 2px #45f3ff";
	}else if(dir == "S"){
		bas.style.boxShadow = "2px 2px 10px 2px #45f3ff";
	}else if(dir == "E"){
		droite.style.boxShadow = "2px 2px 10px 2px #45f3ff";
	}else if(dir == "O"){
		gauche.style.boxShadow = "2px 2px 10px 2px #45f3ff";
	}
}


// update l'info couleur pour que le joueur sache qui il est
// attention : ne fonctionne pas sur les daltoniens 
function updateInfoCouleur(col){
	var elem = document.getElementById("info_couleur");

	if(col==0){
		elem.innerHTML = "You are Blue";
		elem.style.color = "#45f3ff";
	}else if(col==1){
		elem.innerHTML = "You are Red";
		elem.style.color = "red";
	}else if(col==2){
		elem.innerHTML = "You are Yellow";
		elem.style.color = "yellow";
	}else if(col==3){
		elem.innerHTML = "You are Green";
		elem.style.color = "lightgreen";
	}

}

function clickBlock(id){
	console.log("Click on block id "+id);
}


// **************************
// Hide'N Seek functions
// **************************

//hideAll();
//seek("vueConnexion");

function hideAll(){
	var elem1 = document.getElementById("vueConnexion");
	var elem2 = document.getElementById("vueMenu");
	var elem3 = document.getElementById("vueLobby");
	var elem4 = document.getElementById("vueScores");
	var elem5 = document.getElementById("vueEcranFin");
	var elem6 = document.getElementById("vueJeu");
	elem1.style.display = "none";
	elem2.style.display = "none";
	elem3.style.display = "none";
	elem4.style.display = "none";
	elem5.style.display = "none";
	elem6.style.display = "none";
}

function seek(vue){
	hideAll();
	var elem = document.getElementById(vue);
	elem.style.display = "";
}