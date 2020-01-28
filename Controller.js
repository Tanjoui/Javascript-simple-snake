
class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.interval = null;
		this.skin = [0,0,0];
		this.bindDrawtoModel = (matrice,dir, score, highscore) =>{
			this.view.drawentities(matrice,dir, this.skin);
			this.view.drawscore(score, highscore);
		};
		this.model.binddraw(this.bindDrawtoModel);
		document.getElementById("snake0").addEventListener("click",this.changeSnake(0));
		document.getElementById("snake1").addEventListener("click",this.changeSnake(1));
		document.getElementById("level0").addEventListener("click",this.changeBckgrnd(0));
		document.getElementById("level1").addEventListener("click",this.changeBckgrnd(1));
		document.getElementById("fruit0").addEventListener("click",this.changeFruit(0));
		document.getElementById("fruit1").addEventListener("click",this.changeFruit(1));
	}
	
	changeSnake(text){
		this.skin[0]=text;

	}
	changeBckgrnd(text){
		this.skin[1]=text;

	}
	changeFruit(text){
		this.skin[2]=text;

	}

	//A changer, preferer des events sur les touches importantes qui trigger la methode turn;
	clavier(e){
		// console.log(e)
		let k = e.keyCode;
		// console.log(k)
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
			case 82:
			this.reset();
			break;
			default :
		}
	}



	run(){
		console.log("Starting Game ");
		this.model.setcontroller(this);
		this.interval = setInterval(()=> {this.model.step()}, 1/document.getElementById("speed").value * 1000); //chaque seconde execute un step
		window.addEventListener('keydown',this.clavier)
		this.printscore = setInterval(()=> {this.view.drawscore(this.model)}, 100);
	}

	reset(){
		console.log("reset");
		clearInterval(this.interval);
		this.model.setscore();
		this.model.deleteFruit();
		this.model.removeSnake()
		this.model.snake.resetBody(this.model.sizex, this.model.sizey)
		this.model.addFruit()
		this.sleep(500)
		this.view.drawhighscore(this.model)
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
