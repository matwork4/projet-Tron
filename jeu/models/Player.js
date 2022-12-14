
/* Directions : 
 * N, S, E, O
 *
 */



class Player{

	constructor(idPlayer, idBlock, direction, isControlled, isBot){
		this.id = idPlayer;
		this.isAlive = true;
		this.direction = direction;
		this.idBlock = idBlock;
		this.lifeTime = 0;
		this.isControlled = isControlled;
		this.isBot = isBot;
	}

	die(newB){
		if(newB.isWall){
			this.isAlive = false;
		}
	}

	setDirection(dir){
		this.direction = dir;
	}

	//choix de l'IA
	choixDirection(){
		
		let bonChoix = true;
		let b = T.getBlockByID(this.idBlock);

		//On vérifie si la case devant lui est un mur
		if(this.direction == 'N' && T.getBlockByID((this.idBlock)-(dimY-1)).isWall){
			bonChoix = false;
		}else if(this.direction == 'S' && T.getBlockByID((this.idBlock)+(dimY-1)).isWall){
			bonChoix = false;
		}else if(this.direction == 'E' && T.getBlockByID((this.idBlock)+1).isWall){
			bonChoix = false;
		}else if(this.direction == 'O' && T.getBlockByID((this.idBlock)-1).isWall){
			bonChoix = false;
		}

		//Si c'est un mur, on change de direction
		//Sinon il y a quand même une petite chance de tourner
		if(bonChoix == false || getRandomInt(60) == 0){
			//On ajoute les choix possibles dans un tableau
			bonChoix = [];
			if(T.getBlockByID((this.idBlock)-(dimY-1)).isWall == false){
				bonChoix.push('N');
			}
			if(T.getBlockByID((this.idBlock)+(dimY-1)).isWall == false){
				bonChoix.push('S');
			}
			if(T.getBlockByID((this.idBlock)+1).isWall == false){
				bonChoix.push('E');
			}
			if(T.getBlockByID((this.idBlock)-1).isWall == false){
				bonChoix.push('O');
			}

			//Si il y en a au moins 1, on tire un choix aléatoire
			if(bonChoix.length > 0){
				let random = getRandomInt(bonChoix.length);
				this.direction = bonChoix[random];
				console.log("Bot "+this.id+" turn "+this.direction);
			}else{
				console.log("Rip Bot "+this.id);
			}
		}
		
		

	}


}






