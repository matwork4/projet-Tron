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

		newB.setPlayer(P.color);
		P.lifeTime++;
		if (P.die(newB)){
			// le joueur a perdu
			jeu.result="defaite";
		}
		P.idBlock = newB.id;


	}


}


















