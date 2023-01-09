

class Terrain{


	constructor(dimX,dimY){
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
		this.nbBlocks = idBlock;
		this.tab = tab;
		this.dimX = dimX;
		this.dimY = dimY;
	}

	addPlayer(P){
		this.getBlockByID(P.idBlock).setPlayer(P.color);
	}

	getBlockByID(idBlock){
		for(let i=0;i<dimY-1;i++){
			for(let j=0;j<dimX-1;j++){
				if(this.tab[i][j].id == idBlock){
					return this.tab[i][j];
				}
			}
		}
	}

	avancePlayer(P){
		let b = this.getBlockByID(P.idBlock);
		b.removePlayer();
		let newB;

		if(P.direction == 'S'){
			newB = this.getBlockByID((P.idBlock)+(dimY-1));
		}else if(P.direction == 'N'){
			newB = this.getBlockByID((P.idBlock)-(dimY-1));
		}else if(P.direction == 'E'){
			newB = this.getBlockByID((P.idBlock)+1);
		}else if(P.direction == 'O'){
			newB = this.getBlockByID((P.idBlock)-1);
		}else{
			console.log("Erreur direction : "+P.direction);
		}

		newB.setPlayer(P.color);
		P.lifeTime++;
		P.die(newB);
		P.idBlock = newB.id;


	}


}


















