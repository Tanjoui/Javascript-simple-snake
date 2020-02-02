
class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.interval = null;
		this.skin = [0,0,0];

		this.bindDrawtoModel = (matrice,dir, score, highscore) =>{
			this.view.drawentities(matrice,dir, this.skin);

			// console.log(this.skin);
		};
		this.model.binddraw(this.bindDrawtoModel);
		window.addEventListener('keydown',(e)=>{this.clavier(e)});
	}

	changeSnake(text){
		this.skin[0]=text;
		this.reloadGfx();
	}
	changeBckgrnd(text){
		this.skin[1]=text;
		this.reloadGfx();
	}
	changeFruit(text){
		this.skin[2]=text;
		this.reloadGfx();
	}

	//A changer, preferer des events sur les touches importantes qui trigger la methode turn;
	clavier(e){
		// console.log(e)
		let k = e.keyCode;
		// console.log(k)
		e.preventDefault(); //annuler le comportement par défaut des flèches
		if (this.model.mort == 1){
			if (k == 82){ // si on appui sur R => reset
				this.reset();
			}
			return;
		}
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
			case 82 :
			this.reset();
			break;
			default :
		}
	}



	InitRun(){
		console.log("Starting Game ");
		this.interval = setInterval(()=> {this.run()}, 1/document.getElementById("speed").value * 1000); //chaque seconde execute un step
		this.printscore = setInterval(()=> {this.view.drawscore(this.model.score, this.model.highscore)}, 100);
	}
	run(){
		if(this.model.mort == 0){
			this.model.step();
		}
		else {
			this.pause();
		}
	}

	pause(){
		clearInterval(this.interval);
		clearInterval(this.printscore);
	}

	reset(){
		this.pause();
		this.model.reset();
		this.reloadbg();
		this.sleep(500)
		this.InitRun()
		return;
	}
	reloadbg(){
		this.view.drawbackground(this.model.sizex, this.skin);
		this.model.drawTiles();
	}

	reloadGfx(){
		this.view.resetentities();
		this.reloadbg();

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
