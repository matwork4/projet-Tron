
class Block{

	constructor(idBlock, color=0, isWall=false, isPlayer=false){
		this.id = idBlock;
		this.color = color; //0: vide, 1: bleu, 2: rouge, 3: jaune, 4: vert
		this.isWall = isWall;
		this.isPlayer = isPlayer;
		this.isTnt = false;
		this.isExplosion = false;
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

	setTnt(){
		this.isTnt = true;
	}


}