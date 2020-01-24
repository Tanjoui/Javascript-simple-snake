
class Controller {


	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.interval = null;
		this.bindDrawtoModel = (matrice,dir) => {
			this.view.drawentities(matrice,dir);
		}
		this.model.binddraw(this.bindDrawtoModel);
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

	restart(t){
		if(t == 1){

		}else{

		}
	}

	run(){
        console.log("Starting Game ");
        this.model.setcontroller(this)
				this.view.drawbackground(20);
    	this.interval = setInterval(()=> {this.model.step()}, 300); //chaque seconde execute un step
		window.addEventListener('keydown',this.clavier)
	}
  	reset(){
	    console.log("reset");
	    clearInterval(this.interval);

		//this.model.removeSnake()
	    this.model.removeSnake()
	    this.model.snake.resetBody(this.model.sizex, this.model.sizey)


	    this.run()
	    return;
  }
}
