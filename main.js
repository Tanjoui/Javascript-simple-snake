
class Snake {

}

class Model {
  constructor(canvas) {
  	this.canvas = canvas //le canvas où se déroule jeu 
		this.context = this.canvas.getContext('2d') //contexte du canvas
		this.canvas.crossOrigin = "Anonymous"
  }

  	var snake = new Snake()

  	step(){
  		time = temps+1;
  		move(); //nouveau mouvement 
  		return matrice;
  	}

  	move(){//deplace le serpent
  		snake.head
  		switch(snake.dir){ //génération d'une nouvelle tête selon la direction
  			case 1 :
  				head = (snake.x-1, snake.y) 
  			case 2 :
  				head = (snake.x, snake.y-1)
  			case 3 :
  				head = (snake.x+1, snake.y)
  			case 4 :
  				head = (snake.x, snake.y+1)
  		}
  		checkWall(head[0], head[1])
  		checkBody(head[0], head[1])
  		let found = checkFruit(head[0], head[1])// on passe les tests de collision

  		snake.liste.unshift(head); //on ajoute une nouvelle tête au debut
  		if(found = 0){ //si on a pas trouvé de fruit
  			snake.pop(); //on supprime le dernier element
  		}
  	}

  	checkWall(x, y){
  		if(x >= size || y>= size || x <= 0 || y < 0){
  			console.log("PERDU")
			sound(2)
			Controller.reset()
  		}
  	}

  	checkBody(x, y){
  		//vérifie si la nouvelle tête rencontre le body
  		for(i=0; i<snake.liste.length; i++){
  			if(snake.liste[i][0] == x && snake.liste[i][1] == y){
  				console.log("PERDU")
				sound(2)
				Controller.reset()
  			}
  		}
  	}

  	checkFruit(x, y){
  		//vérifie si on mange un fruit
  		if(matrice[x][y] = 2){
  			console.log("fruit trouvé")
			sound(1)
			return 1;
  		}else{
  			return 0;
  		}
  	}
	

	turn(direction){// change la direction du serpent selon l'inpout
		switch(direction){
			case 1 ://gauche
				if(head.dir == 3){
					console.log("move impossible")
					sound(2)
				}else{
					snake.dir = 1
				}
				
			case 2 ://haut
				if(head.dir == 4){
					console.log("move impossible")
					sound(2)
				}else{
					snake.dir = 2
				}

			case 3 ://droite
				if(head.dir == 1){
					console.log("move impossible")
					sound(2)
				}else{
					snake.dir = 3
				}

			case 4 : //bas
				if(head.dir == 2){
					console.log("move impossible")
					sound(2)
				}else{
					snake.dir = 4
				}

		}

	}
	sound(id){// joue un son donné
		var bruit = new Audio();
		switch(id){
		case 1:
			bruit.src = "son/yea.wav"
		case 2:
			ruit.src = "son/blbl.wav"
		case 3: 
			bruit.src = "son/gr.wav"
		}
   		bruit.play();
	}


}

class View {
  constructor() {}


}

class Controller {


  constructor(model, view) {
    this.model = model
    this.view = view
  }


function clavier(e){

  k = e.keyCode;
  e.preventDefault(); //annuler le comportement par défaut des flèches 

 switch(k) {
  	 case 37 : // touche gauche
      Model.turn(4)
      break;
    case 38 : // touche haut
      Model.turn(1)
      break;
    case 39 : // touche droite
      Model.turn(2)
      break;
    case 40 : // touche bas
      Model.turn(3)
      break;
    default :
  }

}

  run(){
  	setInterval(Model.step() , 1000); //chaque seconde execute un step

  }
}

const app = new Controller(new Model(), new View())
Controller.run();


