
class Controller {


	constructor(model, view) {
		this.model = model
		this.view = view
	}


	clavier(e){
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
	         let grille = setInterval(this.model.step() , 1000); //chaque seconde execute un step
	}
}
