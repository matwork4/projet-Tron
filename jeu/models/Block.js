
class Block{

	constructor(idBlock){
		this.id = idBlock;
		this.color = 0; //0: vide, 1: bleu, 2: rouge, 3: jaune, 4: vert
		this.isWall = false;
		this.isPlayer = false;
	}

	setWall(){
		this.isWall = true;
	}

	setPlayer(color){
		this.isPlayer = true;
		this.color = color;
		//this.isWall = true;
	}

	removePlayer(){
		this.isPlayer = false;
		this.isWall = true;
	}


}