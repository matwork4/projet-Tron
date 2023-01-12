/* Fonctions qui modifient le DOM html
*/

function displayTerrain(){
	console.log("displayTerrain")

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
	console.log("deleteTerrain")
	document.getElementById("childTerrain").remove();
}

function updateChrono(){
	jeu.chrono+=jeu.sleepDuration+49; //on estime à 49ms le temps d'exécution de chaque boucle
	document.getElementById("chrono").innerHTML = "Temps = "+(jeu.chrono/1000)+" s";

}







