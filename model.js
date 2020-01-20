class Model {
	logtab(){
		console.log("affichage de la grille ");
		var text="";
		for (var i = 0; i < this.sizex; i ++ ){
			for ( var j = 0; j < this.sizey ; j ++ ){
				text = text + this.grille[i][j]+" ";
			}
			text= text + "<br>";
			document.getElementById("slt").innerHTML=text;
		}
	}

	constructor(canvas) {
		this.sizex = 10;
		this.sizey = 10;
		this.time = 0;
	    this.grille = new Array(this.sizex); //map full zero
			for ( var i = 0 ; i < this.sizex; i ++){
				this.grille[i]=new Array(this.sizey).fill(0);
			}
	    this.snake = new Snake();
			this.setSnake();
	    //création de la carte et d'un seprent
	    this.addFruit(); //on place un fruit
			this.logtab();
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
		console.log("Tentative d'accee a la grille coord" +x + ":"+y);
	  	if (x < this.sizex && x > 0 && y < this.sizey && y > 0){
	  		return this.grille[x][y];
	  	}
	  	else {
	  		return 0;
	  	}
	}
	getgrille(){
	  	return this.grille;
	}

	addFruit(){
	  	let x = Math.floor(Math.random() * (this.sizex));
	  	let y = Math.floor(Math.random() * this.sizey);
	  	while (this.getTile(x,y) != 0){
	  		x = Math.floor(Math.random() * (this.sizex));
	  		y = Math.floor(Math.random()* this.sizey);
	  	}
	  	this.setTile(x,y,3);
	}
	removeSnake(){
		let liste = this.snake.getListe();
		for (var i = 0; i < liste.length; i ++) {
			console.log("Contenu de e : "+ liste[i]);
			if ( getTile(liste[i][0],liste[i][1])==1 || getTile(liste[i][0],liste[i][1])==2){
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
  		this.time = this.time+1;
        this.move(); //nouveau mouvement
        return this.grille;
  	}

  	move(){//deplace le serpent
			var head;
        switch(this.snake.direction){ //génération d'une nouvelle tête selon la direction
          case 1 :
          head = (this.snake.liste[0]-1, this.snake.liste[1].y)
          case 2 :
          head = (this.snake.liste[0], this.snake.liste[1].y-1)
          case 3 :
          head = (this.snake.liste[0]+1, this.snake.liste[1].y)
          case 4 :
          head = (this.snake.liste[0], this.snake.liste[1]+1)
        }
        this.checkWall(head[0], head[1])
    	this.checkBody(head[0], head[1])
        let found = this.checkFruit(head[0], head[1])// on passe les tests de collision

        this.snake.liste.unshift(head); //on ajoute une nouvelle tête au debut
        if(found = 0){ //si on a pas trouvé de fruit
	      	this.getListe().pop(); //on supprime le dernier element
        }
    }

    checkWall(x, y){
      	if(x >= this.sizex || y>= this.sizey || x < 0 || y < 0){
      		console.log("PERDU")
      		sound(2)
      		Controller.reset()
      	}
    }

    checkBody(x, y){
    	//vérifie si la nouvelle tête rencontre le body
	    for(var i=0; i<this.snake.liste.length; i++){
	          	if(this.snake.liste[i][0] == x && this.snake.liste[i][1] == y){
	          		console.log("PERDU")
	          		sound(2)
	          		Controller.reset()
	          	}
	        }
	    }
    checkFruit(x, y){
        //vérifie si on mange un fruit
        if(this.grille[x][y] = 2){
          	console.log("fruit trouvé");
          	this.sound(1);
          	return 1;
        }else{
          	return 0;
        }
    }

	turn(direction){// change la direction du serpent selon l'inpout
		switch(direction){
            case 1 ://gauche
            if(this.snake.dir == 3){
            	console.log("move impossible");
            	this.sound(2);
            }else{
            	this.snake.dir = 1;
            }

            case 2 ://haut
            if(this.snake.dir == 4){
            	console.log("move impossible")
            	this.sound(2)
            }else{
            	this.snake.dir = 2
            }

            case 3 ://droite
            if(this.snake.dir == 1){
            	console.log("move impossible")
            	this.sound(2)
            }else{
            	this.snake.dir = 3
            }

            case 4 : //bas
            if(this.snake.dir == 2){
            	console.log("move impossible")
            	this.sound(2)
            }else{
            	this.snake.dir = 4
            }

        }
    }

	sound(id){// joue un son donné
		var bruit = new Audio();
		switch(id){
			case 1:
			bruit.src = "son/yea.wav"
			case 2:
			bruit.src = "son/blbl.wav"
			case 3:
			bruit.src = "son/gr.wav"
		}
		bruit.play();
	}


}
