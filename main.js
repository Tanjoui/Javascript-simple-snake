
class Snake {

	getListe(){
		return this.liste;
	}

	constructor(){
	    this.direction = 1; //direction par défaut = gauche
	    this.liste = new Array(0); //liste des maillons
	    //tete = liste[0]
	    this.vivant = true; //vivant
	    this.liste.unshift([5,5],[5,6]); //on ajoute 2 maillons au serpent

	    console.log(this.liste);
	}
}


class Model {
	constructor(canvas) {
		this.sizex = 10;
		this.sizey = 10;
	    this.grille = new Array(this.sizex).fill(new Array(this.sizey).fill(0)); //map full zero
	    this.snake = new Snake();
	    //création de la carte et d'un seprent
	    console.log(this.grille);
	    addFruit(); //on place un fruit
	    console.log(this.grille);
	}
	  // 0 : vide
	  // 1 : head_snake
	  // 2 : body_snake
	  // 3 : fruit
	setTile(x,y,val){
	  	if (x < this.sizex && x > 0 && y < this.sizey && y > 0){
	  		if ( val <= 3){
	  			this.grille[x][y]=val;
	  			console.log("Ecriture de "+ val + " aux coord "+x+":"+y);
	  		}
	  	}
	}
	getTile(x,y){
	  	if (x < this.sizex && x > 0 && y < this.sizey && y > 0){
	  		return grille[x][y];
	  	}
	  	else {
	  		return 0;
	  	}
	}
	getgrille(){
	  	return grille;
	}

	addFruit(){
	  	let x = grille.random();
	  	let y = grille.random();
	  	while (getTile(x,y) != 0){
	  		x = grille.random();
	  		y = grille.random();
	  	}
	  	setTile(x,y,3);
	}
	removeSnake(){
		let liste = this.snake.getListe();
		for (var i = 0; i < liste.length; i ++) {
			console.log("Contenu de e : "+ liste[i]);
			this.setTile(liste[i][0],liste[i][1],0);
			}
		}

	}
	setSnake(){
		let liste = this.snake.getListe();
		this.setTile(liste[0][0],liste[0][1],1);

		for (var i = 1; i < liste.length; i ++) {
			console.log("Contenu de e : "+ liste[i]);
			this.setTile(liste[i][0],liste[i][1],2);
			}
		}




  	step(){
  		time = temps+1;
        move(); //nouveau mouvement
        return grille;
  	}

  	move(){//deplace le serpent
        switch(snake.direction){ //génération d'une nouvelle tête selon la direction
          case 1 :
          head = (snake.liste[0]-1, snake.liste[1].y)
          case 2 :
          head = (snake.liste[0], snake.liste[1].y-1)
          case 3 :
          head = (snake.liste[0]+1, snake.liste[1].y)
          case 4 :
          head = (snake.liste[0], snake.liste[1]+1)
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
        if(grille[x][y] = 2){
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
	          setInterval(let grille = Model.step() , 1000); //chaque seconde execute un step
	}
}

  const app = new Controller(new Model(), new View())
  Controller.run();
