
class Controller {


	constructor(model, view) {
		this.model = model
		this.view = view
		this.interval = null;
	}
	print(matrice, direction){
		// this.view.logtab(matrice);
		this.view.drawentities(matrice,direction);
	}


//A changer, preferer des events sur les touches importantes qui trigger la methode turn;
	clavier(e){
		console.log(e)
		let k = e.keyCode;
		console.log(k)
  		e.preventDefault(); //annuler le comportement par défaut des flèches

	  	switch(k) {
	        case 37 : // touche gauche
	        this.model.turn(1)
	        break;
		    case 38 : // touche haut
		    this.model.turn(2)
		    break;
		    case 39 : // touche droite
		    this.model.turn(3)
		    break;
		    case 40 : // touche bas
		    this.model.turn(4)
		    break;
		    default :
		}
	}



	run(){
        console.log("Starting Game ");
        this.model.setcontroller(this)
				this.view.drawbackground(20);
    	this.interval = setInterval(()=> {this.model.step()}, 100); //chaque seconde execute un step
		window.addEventListener('keydown',this.clavier)
	}

  	reset(){
	    console.log("reset");
	    clearInterval(this.interval);

		this.model.deleteFruit();
		this.print(this.model.grille, this.model.snake.direction)
	    this.model.removeSnake()
	    this.model.snake.resetBody(this.model.sizex, this.model.sizey)
	    this.model.addFruit()
	    this.sleep(100)
	    this.run()
	    return;
  }
  sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
}
