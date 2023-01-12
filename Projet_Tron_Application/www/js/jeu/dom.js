/* Fonctions qui modifient le DOM html
*/

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

function deleteTerrain(){
	document.getElementById("childTerrain").remove();
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
		haut.style.boxShadow = "2px 2px 10px 2px black";
	}else if(dir == "S"){
		bas.style.boxShadow = "2px 2px 10px 2px black";
	}else if(dir == "E"){
		droite.style.boxShadow = "2px 2px 10px 2px black";
	}else if(dir == "O"){
		gauche.style.boxShadow = "2px 2px 10px 2px black";
	}
}


// update l'info couleur pour que le joueur sache qui il est
// attention : ne fonctionne pas sur les daltoniens 
function updateInfoCouleur(col){
	var elem = document.getElementById("info_couleur");

	if(col==0){
		elem.innerHTML = "Vous êtes Bleu";
		elem.style.color = "blue";
	}else if(col==1){
		elem.innerHTML = "Vous êtes Rouge";
		elem.style.color = "red";
	}else if(col==2){
		elem.innerHTML = "Vous êtes Jaune";
		elem.style.color = "orange";
	}else if(col==3){
		elem.innerHTML = "Vous êtes Vert";
		elem.style.color = "green";
	}

}





