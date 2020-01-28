class View {
	constructor(size) {
		this.size = size;
		this.canv = document.getElementById("Canvas");
		this.ctx = this.canv.getContext("2d");
		this.canv.height=32 * size+ 2 * 32;
		this.canv.width=32 * size + 2 * 32;
		this.canv.style.width  = 32 * size+ 2 * 32 + 'px';
		this.canv.style.height = 32 * size+ 2 * 32 + 'px';
		this.oldgrille = new Array(this.size); //map full zero
		 for ( var i = 0 ; i < this.size; i ++){
			 this.oldgrille[i]=new Array(this.size).fill(0);
		 };
		 this.head=document.getElementById("head_0");
		 this.changeSnake(0);
		 this.changeBckgrnd(0);
		 this.changeFruit(0);
		 // console.log("End init : "+ this.sol);
		 this.drawbackground(size);
		 console.log(this);
	}

	changeSnake(text){
		this.head= document.getElementById("head_"+text);
		this.body = document.getElementById("body_"+text);
	}
	changeBckgrnd(text){
		this.sol =  document.getElementById("sol_"+text);
		this.mur = document.getElementById("mur_"+text);
	}
	changeFruit(text){
		this.fruit = document.getElementById("fruit_"+text);
	}

	drawscore(score, highscore){
		if(highscore * 4 < score){
			document.getElementById("score").style.color = "red"
		}else if(highscore * 2 < score){
			document.getElementById("score").style.color = "green"
		}else if(highscore < model.score){
			document.getElementById("score").style.color = "yellow"
		}else{
			document.getElementById("score").style.color = "black"
		}
		document.getElementById("score").innerHTML = model.score
	}

	drawhighscore(model){
		document.getElementById("highscore").innerHTML = model.highscore
	}


	drawbackground(dim){

		this.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
		for (var i = 0; i < dim + 3; i++){
				this.ctx.drawImage(this.mur,i*32,0,32,32);
				this.ctx.drawImage(this.mur,i*32,32 * this.size+ 2 * 32-32,32,32);
				this.ctx.drawImage(this.mur,0,i*32,32,32);
				this.ctx.drawImage(this.mur,32 * this.size+ 2 * 32-32,i*32,32,32);

		}
		for (var i =0; i < dim; i ++){
			for (var j = 0 ; j < dim; j ++){
				this.ctx.drawImage(this.sol,32+i*32,32+j*32,32,32);
			}
		}
	}

	drawentities(grille, rota, skin){
		console.log("Output graph");
		skin = [ 0,0,0];
		var head= document.getElementById("head_"+skin[0]);
		var body = document.getElementById("body_"+skin[0]);
		var sol =  document.getElementById("sol_"+skin[1]);
		var mur = document.getElementById("mur_"+skin[1]);
		var fruit= document.getElementById("fruit_"+skin[2]);
		console.log(head);
		console.log(body);
		for (var i =0; i < grille.length; i ++){
			for ( var j = 0 ; j<grille.length;j++){
				var x = 32+i*32;
				var y = 32+j*32;
				if (grille[i][j]!=this.oldgrille[i][j]){
					this.ctx.drawImage(sol,x,y,32,32);
					this.oldgrille[i][j]=grille[i][j];
				switch (grille[i][j]){
					case 1 :
					this.ctx.save();
					this.ctx.translate(x+16,y+16);
					console.log("Rota : " + rota);
					switch (rota){
							case 1 :
							this.ctx.rotate( -90 *(Math.PI/180));
							break;
							case 2 :
							this.ctx.rotate( 0 );
							break;
							case 3 :
							this.ctx.rotate(  90*(Math.PI/180));
							break;
							case 4 :
							this.ctx.rotate(180*(Math.PI/180));
							break;
					}
					//console.log("Draw head");
					this.ctx.drawImage(head, 0, 0, 32, 32,-16, -16, 32, 32);
					this.ctx.restore();
					break;
					case 2 :
					this.ctx.drawImage(body,x,y,32,32);
					break;
					case 3 :
					this.ctx.drawImage(fruit,x,y,32,32);
					break;
				}
				}
			}
		}
	}
	logtab(grille){
		console.log("affichage de la grille ");
		var text="";
		for (var i = 0; i < grille.length; i ++ ){
			for ( var j = 0; j < grille.length ; j ++ ){
        var tmp = "";
        switch (grille[j][i]){
          case 0 :
          tmp = "□";
          break;
          case 1 :
          tmp = "●";
          break;
          case 2 :
          tmp ="■";
          break;
          case 3 :
          tmp = "◈";
          break;
        }
				text = text + tmp+" ";
			}
			text= text + "<br>";
		}
    // console.log(text)
    document.getElementById("slt").innerHTML="";
    document.getElementById("slt").innerHTML=text;
	}
}
