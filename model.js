class Model {

  setcontroller(c){
    this.cont = c;
  }



	constructor(cont) {
    this.cont = cont
    this.sizex = 20;
		this.sizey = 20;
		this.time = 0;
	    this.grille = new Array(this.sizex); //map full zero
			for ( var i = 0 ; i < this.sizex; i ++){
				this.grille[i]=new Array(this.sizey).fill(0);
			}
	    this.snake = new Snake(this.sizex, this.sizey);
			this.setSnake();
	    //création de la carte et d'un seprent
      this.xFruit = 0;
      this.yFruit = 0;
	    this.addFruit(); //on place un fruit

	}
	  // 0 : vide
	  // 1 : head_snake
	  // 2 : body_snake
	  // 3 : fruit
	setTile(x,y,val){
	  	if (x < this.sizex && x >= 0 && y < this.sizey && y >= 0){
	  		if ( val <= 3){
	  			this.grille[x][y]=val;
	  			//console.log("Ecriture de "+ val + " aux coord "+x+":"+y);
	  		}
	  	}
	}
	getTile(x,y){
		//console.log("Tentative d'accee a la grille coord" +x + ":"+y);
	  	if (x < this.sizex && x >= 0 && y < this.sizey && y >= 0){
        //console.log("Reponse : "+this.grille[x][y]);
	  		return this.grille[x][y];
	  	}
	  	else {
	  		return 0;
	  	}
	}
	getgrille(){
	  	return this.grille;
	}
  deleteFruit(){
    this.setTile(this.xFruit, this.yFruit, 0)
  }

	addFruit(){
	  	let x = Math.floor(Math.random() * (this.sizex));
	  	let y = Math.floor(Math.random() * this.sizey);
	  	while (this.getTile(x,y) != 0){
	  		x = Math.floor(Math.random() * (this.sizex));
	  		y = Math.floor(Math.random()* this.sizey);
	  	}
      this.xFruit = x;
      this.yFruit = y;
	  	this.setTile(x,y,3);
	}
	removeSnake(){
		let liste = this.snake.getListe();
		for (var i = 0; i < liste.length; i ++) {
			//console.log("Contenu de e : "+ liste[i]);
			if ( this.getTile(liste[i][0],liste[i][1])==1 || this.getTile(liste[i][0],liste[i][1])==2){
				this.setTile(liste[i][0],liste[i][1],0);
			}
		}
	}

	setSnake(){
		let liste = this.snake.getListe();
		this.setTile(liste[0][0],liste[0][1],1);

		for (var i = 1; i < liste.length; i ++) {
			this.setTile(liste[i][0],liste[i][1],2);
			}
		}




  	step(){
      
      //console.log("Log de game : " + this+", step num :" + this.time);
  		this.time = this.time+1;
      this.move(); //nouveau mouvement
      this.cont.print(this.grille, this.snake.direction)
      return this.grille;
  	}

    turn(e){
      switch(e){
        case 1:
          if(this.snake.direction == 3){
            console.log('et non');
            this.sound(2);
          }else{
            this.snake.direction = 1;
            this.sound(3)
          }
          break;
        case 2:
          if(this.snake.direction == 4){
            console.log('et non');
            this.sound(2);
          }else{
            this.snake.direction = 2;
            this.sound(3)
          }
          break;
        case 3:
          if(this.snake.direction == 1){
            console.log('et non');
            this.sound(2);
          }else{
            this.snake.direction = 3;
            this.sound(3)
          }
          break;
        case 4:
          if(this.snake.direction == 2){
            console.log('et non');
            this.sound(2);
          }else{
            this.snake.direction = 4;
            this.sound(3)
          }
          break;
      }


    }
  	move(){//deplace le serpent
			var head;
        console.log(this.snake.liste + "dir :"+this.snake.direction);
        switch(this.snake.direction){ //calcul des coords de la prochaine tete selon la direction
          case 1 :
          head = [this.snake.liste[0][0]-1, this.snake.liste[0][1]]
          break;
          case 2 :
          head = [this.snake.liste[0][0], this.snake.liste[0][1]-1]
          break;
          case 3 :
          head = [this.snake.liste[0][0]+1, this.snake.liste[0][1]]
          break;
          case 4 :
          head = [this.snake.liste[0][0], this.snake.liste[0][1]+1]
          break;
        }
        console.log("case a check : "+head[0]+" "+head[1]);


        let lose1 = this.checkWall(head[0], head[1]);
    	  let lose2 = this.checkBody(head[0], head[1]);
        if(lose1 == 1 || lose2 == 1){
          //this.cont.interval = setTimeout(wait, 200);
          this.cont.reset();
          return 0;
        }

        let found = this.checkFruit(head[0], head[1])// on passe les tests de collision
        this.removeSnake();
        this.snake.liste.unshift(head); //on ajoute une nouvelle tête au debut
        if(found == 0){ //si on a pas trouvé de fruit
	      	this.snake.getListe().pop(); //on supprime le dernier element
        }
        console.log(this.snake.liste);
        this.setSnake();
        console.log("dir :"+this.snake.direction);
    }



    checkWall(x, y){
      	if(x >= this.sizex || y>= this.sizey || x < 0 || y < 0){
      		console.log("PERDU")
      		this.sound(2)
      		return 1;
      	}
    }

    checkBody(x, y){
    	//vérifie si la nouvelle tête rencontre le body

	          	if(this.getTile(x,y) == 2){
	          		console.log("PERDU")
	          		this.sound(2)
	          		return 1;
	          	}

	    }
    checkFruit(x, y){
        //vérifie si on mange un fruit
        if(this.grille[x][y] ==  3){
          	console.log("fruit trouvé");
          	this.sound(1);
            this.addFruit();
          	return 1;
        }else{
          	return 0;
        }
    }

    reset(){
      this.snake.resetBody()
    }



	sound(id){// joue un son donné
		var bruit = new Audio();
		switch(id){
			case 1:
			bruit.src = "son/yea.wav"
      break;
			case 2:
			bruit.src = "son/blbl.wav"
      break;
			case 3:
			bruit.src = "son/gr.wav"
      break;
		}
		bruit.play();
	}


}
