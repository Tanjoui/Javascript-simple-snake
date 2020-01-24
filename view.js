class View {
	constructor(size) {
		this.size = size;
		this.canv = document.getElementById("Canvas");
		this.canv.heigth=704;
		this.canv.width=704;
		this.canv.style.width  = '704px';
		this.canv.style.height = '704px';
		this.oldgrille = new Array(this.size); //map full zero
		 for ( var i = 0 ; i < this.size; i ++){
			 this.oldgrille[i]=new Array(this.sizey).fill(0);
		 };
	}
	drawbackground(dim){
		var ctx = this.canv.getContext("2d");
		ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height)
		var bckgrnd = document.getElementById("sol");
		var mur = document.getElementById("mur");

		for (var i = 0; i < dim + 3; i++){

				ctx.drawImage(mur,i*32,0,32,32);
				ctx.drawImage(mur,i*32,704-32,32,32);
				ctx.drawImage(mur,0,i*32,32,32);
				ctx.drawImage(mur,704-32,i*32,32,32);

		}


		for (var i =0; i < dim; i ++){
			for (var j = 0 ; j < dim; j ++){
				ctx.drawImage(bckgrnd,32+i*32,32+j*32,32,32);
				//console.log("Affichage de l'image "+i+":"+j);
			}
		}
	}
	drawentities(grille, rota){

		var ctx = this.canv.getContext("2d");
		var head = document.getElementById("head");
		var body = document.getElementById("body");
		var fruit = document.getElementById("fruit");
		var sol = document.getElementById("sol");
		for (var i =0; i < grille.length; i ++){
			for ( var j = 0 ; j<grille.length;j++){
				var x = 32+i*32;
				var y = 32+j*32;
				if (grille[i][j]!=this.oldgrille[i][j]){
					ctx.drawImage(sol,x,y,32,32);
					this.oldgrille[i][j]=grille[i][j];
				switch (grille[i][j]){
					case 1 :
					ctx.save();
					ctx.translate(x+16,y+16);
					console.log("Rota : " + rota);
					switch (rota){
							case 1 :
							ctx.rotate( -90 *(Math.PI/180));
							break;
							case 2 :
							ctx.rotate( 0 );
							break;
							case 3 :
							ctx.rotate(  90*(Math.PI/180));
							break;
							case 4 :
							ctx.rotate(180*(Math.PI/180));
							break;
					}
					//console.log("Draw head");
					ctx.drawImage(head, 0, 0, 32, 32,-16, -16, 32, 32);
					ctx.restore();
					break;
					case 2 :
					ctx.drawImage(body,x,y,32,32);
					break;
					case 3 :
					ctx.drawImage(fruit,x,y,32,32);
					break;
					default :
					ctx.drawImage(sol,x,y,32,32);
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
