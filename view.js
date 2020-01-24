class View {
	constructor(size) {
		this.size = size;
		this.canv = document.getElementById("Canvas");
		this.ctx = this.canv.getContext("2d");
		this.canv.heigth=704;
		this.canv.width=704;
		this.canv.style.width  = '704px';
		this.canv.style.height = '704px';
		this.oldgrille = new Array(this.size); //map full zero
		 for ( var i = 0 ; i < this.size; i ++){
			 this.oldgrille[i]=new Array(this.sizey).fill(0);
		 };
		 this.sol =  document.getElementById("sol");
		 this.mur = document.getElementById("mur");
		 this.head = document.getElementById("head");
		 this.body = document.getElementById("body");
		 this.fruit = document.getElementById("fruit");
	}

	drawbackground(dim){

		this.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
		for (var i = 0; i < dim + 3; i++){
				this.ctx.drawImage(this.mur,i*32,0,32,32);
				this.ctx.drawImage(this.mur,i*32,704-32,32,32);
				this.ctx.drawImage(this.mur,0,i*32,32,32);
				this.ctx.drawImage(this.mur,704-32,i*32,32,32);

		}
		for (var i =0; i < dim; i ++){
			for (var j = 0 ; j < dim; j ++){
				this.ctx.drawImage(this.sol,32+i*32,32+j*32,32,32);
				//console.log("Affichage de l'image "+i+":"+j);
			}
		}
	}
	drawentities(grille, rota){
		for (var i =0; i < grille.length; i ++){
			for ( var j = 0 ; j<grille.length;j++){
				var x = 32+i*32;
				var y = 32+j*32;
				if (grille[i][j]!=this.oldgrille[i][j]){
					this.ctx.drawImage(this.sol,x,y,32,32);
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
					this.ctx.drawImage(this.head, 0, 0, 32, 32,-16, -16, 32, 32);
					this.ctx.restore();
					break;
					case 2 :
					this.ctx.drawImage(this.body,x,y,32,32);
					break;
					case 3 :
					this.ctx.drawImage(this.fruit,x,y,32,32);
					break;
					default :
					this.ctx.drawImage(this.sol,x,y,32,32);
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
