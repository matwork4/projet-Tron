/* Fonctions qui modifient le DOM html
*/

function displayTerrain(){
	let terrain = document.createElement("table");
	terrain.setAttribute('id',"childTerrain");

		for(let i=0; i<dimY-1; i++){
			let ligne = document.createElement("tr");
			for(let j=0; j<dimX-1; j++){
				let col = document.createElement("td");
				//col.innerHTML = "0";

				//console.log("T.tab["+i+"]["+j+"].isWall = "+T.tab[i][j].isWall);
				if(T.tab[i][j].isWall){
					col.setAttribute('class', "wall");
				}
				
				if(T.tab[i][j].isPlayer){
					if(T.tab[i][j].color == 1){
						col.setAttribute('class', "playerBlue");
					}else if(T.tab[i][j].color == 2){
						col.setAttribute('class', "playerRed");
					}else if(T.tab[i][j].color == 3){
						col.setAttribute('class', "playerYellow");
					}else if(T.tab[i][j].color == 4){
						col.setAttribute('class', "playerGreen");
					}
				}else{
					if(T.tab[i][j].color == 1){
						col.setAttribute('class', "blue");
					}else if(T.tab[i][j].color == 2){
						col.setAttribute('class', "red");
					}else if(T.tab[i][j].color == 3){
						col.setAttribute('class', "yellow");
					}else if(T.tab[i][j].color == 4){
						col.setAttribute('class', "green");
					}
				}

				col.setAttribute('id', 'block'+T.tab[i][j].id);
				col.setAttribute('onclick','clickBlock('+T.tab[i][j].id+')');

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
	chrono+=sleepDuration+49; //on estime à 49ms le temps d'exécution de chaque boucle
	document.getElementById("chrono").innerHTML = "Temps = "+(chrono/1000)+" s";

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








