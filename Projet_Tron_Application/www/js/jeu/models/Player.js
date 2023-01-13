
/* Directions : 
 * N, S, E, O
 *
 */



class Player{

	constructor(color, idBlock, direction, isControlled, isBot, id){
		this.id = id;
		this.color = color,
		this.isAlive = true;
		this.direction = direction;
		this.idBlock = idBlock;
		this.lifeTime = 0;
		this.isControlled = isControlled;
		this.isBot = isBot;
	}

	/*
	* Vérifie si le joueur est mort, auquel cas renvoie vrai
	*/
	die(newB){
		if(newB.isWall){
			this.isAlive = false;
			return true
		}
		return false
	}
		

	setDirection(dir){
		this.direction = dir;
	}

	//choix de l'IA
	choixDirection(){
		
		let bonChoix = true;
		let isTnt = 'none';
		let b = jeu.T.getBlockByID(this.idBlock);

		//On vérifie si une case autour de lui est une tnt 
		if(jeu.T.getBlockByID((this.idBlock)-(jeu.T.dimY-1)).isTnt){
			isTnt = 'N';
		}else if(jeu.T.getBlockByID((this.idBlock)+(jeu.T.dimY-1)).isTnt){
			isTnt = 'S';
		}else if(jeu.T.getBlockByID((this.idBlock)+1).isTnt){
			isTnt = 'E';
		}else if(jeu.T.getBlockByID((this.idBlock)-1).isTnt){
			isTnt = 'O';
		}

		if(isTnt != 'none'){
			console.log("bot explose tnt !");
			this.direction = isTnt;
			//ajouter le message au serveur
			sendMessage("move", this.direction, this.id, this.color, window.localStorage.getItem('gameId'));
			return;
		}

		//On vérifie si la case devant lui est un mur
		if(this.direction == 'N'  
			&& (jeu.T.getBlockByID((this.idBlock)-(jeu.T.dimY-1)).isWall || jeu.T.getBlockByID((this.idBlock)-(jeu.T.dimY*2)).isWall )){
			bonChoix = false;
		}else if(this.direction == 'S' 
			&& (jeu.T.getBlockByID((this.idBlock)+(jeu.T.dimY-1)).isWall || jeu.T.getBlockByID((this.idBlock)+(jeu.T.dimY*2)).isWall )){
			bonChoix = false;
		}else if(this.direction == 'E' 
			&& (jeu.T.getBlockByID((this.idBlock)+1).isWall || jeu.T.getBlockByID((this.idBlock)+2).isWall )){
			bonChoix = false;
		}else if(this.direction == 'O' 
			&& (jeu.T.getBlockByID((this.idBlock)-1).isWall || jeu.T.getBlockByID((this.idBlock)-2).isWall )){
			bonChoix = false;
		}

		//Si c'est un mur, on change de direction
		//Sinon il y a quand même une petite chance de tourner
		if(bonChoix == false || getRandomInt(100) == 0){
			//On ajoute les choix possibles dans un tableau
			bonChoix = [];
			if(jeu.T.getBlockByID((this.idBlock)-(jeu.T.dimY-1)).isWall == false){
				bonChoix.push('N');
			}
			if(jeu.T.getBlockByID((this.idBlock)+(jeu.T.dimY-1)).isWall == false){
				bonChoix.push('S');
			}
			if(jeu.T.getBlockByID((this.idBlock)+1).isWall == false){
				bonChoix.push('E');
			}
			if(jeu.T.getBlockByID((this.idBlock)-1).isWall == false){
				bonChoix.push('O');
			}

			//Si il y en a au moins 1, on tire un choix aléatoire
			if(bonChoix.length > 0){
				let random = getRandomInt(bonChoix.length);
				this.direction = bonChoix[random];
				//console.log("Bot "+this.id+" turn "+this.direction);
				sendMessage("move", this.direction, this.id, this.color, window.localStorage.getItem('gameId'));
			}else{
				console.log("Rip Bot "+this.id);
			}
		}
		
		

	}


}






