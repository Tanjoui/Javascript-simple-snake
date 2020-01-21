
class Controller {


	constructor(model, view) {
		this.model = model
		this.view = view
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
    	setInterval(()=> {this.model.step()}, 400); //chaque seconde execute un step
		window.addEventListener('keydown',this.clavier)
	}
  reset(){
    console.log("reset");
    return;
  }
}
