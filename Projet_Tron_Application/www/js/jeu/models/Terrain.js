Terrain = {
	// Initialise le terrain a partir de ses dimensions. Initialisation normale
	initWithDim(dimX,dimY){
		var tab = [];
		//Permet d'auto incrémenter l'id
		var idBlock = 0;
		for(let i=0;i<dimY;i++){
				tab[i] = [];	
		}
		for(let i=0;i<dimY-1;i++){
			for(let j=0;j<dimX-1;j++){
				idBlock++;
				tab[i][j]= new Block(idBlock);
				//console.log("idBlock = "+idBlock);
				if(j==0 || j==dimX-2 || i==0 || i==dimY-2){
					tab[i][j].setWall();
				}

			}
			//idBlock--;
		}
		this.tab = tab;
		this.nbBlocks = idBlock;
		this.dimX = this.tab.length;
		this.dimY = this.tab.length;
	},

	// Initialisation du terrain à partir de la grille d'un autre joueur. A utiliser en cas de reconnexion à une partie
	// quittée en plein milieu
	initWithGrid(grille){
		tab=[]
		for(let i=0;i<grille.length;i++){
			tab[i] = [];	
		}
		for(let i=0;i<grille.length;i++){
			for(let j=0;j<grille[i].length;j++){
				// on recopie chaque bloc de la grille donnée en argument
				tab[i][j]= new Block(grille[i][j].id, grille[i][j].color, grille[i][j].isWall, grille[i][j].isPlayer);
				if(j==0 || j==grille.length-2 || i==0 || i==grille.length-2){
					tab[i][j].setWall();
				}

			}
		}
		this.tab = tab
		this.dimX = this.tab.length;
		this.dimY = this.tab.length;
	},

	addPlayer(P){
		this.getBlockByID(P.idBlock).setPlayer(P.color);
	},

	getBlockByID(idBlock){
		for(let i=0;i<this.dimY-1;i++){
			for(let j=0;j<this.dimX-1;j++){
				if(this.tab[i][j].id == idBlock){
					return this.tab[i][j];
				}
			}
		}
	},

	//avance un joueur en fonction de sa direction
	avancePlayer(P){
		let b = this.getBlockByID(P.idBlock);
		b.removePlayer();
		let newB;

		if(P.direction == 'S'){
			newB = this.getBlockByID((P.idBlock)+(this.dimY-1));
		}else if(P.direction == 'N'){
			newB = this.getBlockByID((P.idBlock)-(this.dimY-1));
		}else if(P.direction == 'E'){
			newB = this.getBlockByID((P.idBlock)+1);
		}else if(P.direction == 'O'){
			newB = this.getBlockByID((P.idBlock)-1);
		}else{
			console.log("Erreur direction : "+P.direction);
		}

		//vérifie si on est sur une tnt
		if(newB.isTnt){
			this.explosion(newB);
		}

		newB.setPlayer(P.color);
		P.lifeTime++;
		if (P.die(newB)){
			// le joueur a perdu
			jeu.result="Defeat";
		}
		P.idBlock = newB.id;

	},

	//Place une tnt sur une case libre
	placeTnt(){
		// 1 chance sur 80
		if(getRandomInt(80) == 0){
			let y = getRandomInt(this.dimY-2)+1;
			let x = getRandomInt(this.dimX-2)+1;
			if(this.tab[y][x].isWall == false){
				//console.log("Ajout tnt");
				this.tab[y][x].setTnt();
				/* ------------
				 * ICI message au serveur pour ajouter la tnt
				 * ------------
				 */
			}
		}
	},

	//Explose la tnt : détruit les murs et le terrain
	explosion(b){
		console.log("Boom");
		b.isTnt = false;

		let idBlock = 0;
		let col;

		let posY, posX, y2, x2, distance;

		//récupère la position X et Y du bloc
		for(let i=1;i<this.dimY-1;i++){
			for(let j=1;j<this.dimX-1;j++){
				if(this.tab[i][j].id == b.id){
					posY = i;
					posX = j;
				}
			}
		}

		//trouve les blocs a proximité
		for(let i=1;i<this.dimY-2;i++){
			for(let j=1;j<this.dimX-2;j++){
				y2 = Math.abs(posY-i);
				x2 = Math.abs(posX-j);
				distance = Math.sqrt(y2*y2+x2*x2);
				//console.log("distance : "+distance);
				if(distance < 20){
					this.boom(this.tab[i][j]);
				}
			}
		}
	},

	//supprime les murs et les tnt du rayon
	boom(b){
		if(!(b.color == 0 && b.isWall == true)){
			//console.log("boom id : "+b.id);
			b.color = 0;
			b.isWall = false;
			b.isTnt = false;
			let col = document.getElementById("block"+b.id);
			//col.setAttribute('class', "explosion");
			col.setAttribute('class', "");
		}
	}


}


















