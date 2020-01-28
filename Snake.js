class Snake {

	getListe(){
		return this.liste;
	}

	resetBody(sx, sy){
		this.liste = [];
		let x = Math.floor(Math.random() * sx);
	  	let y = Math.floor(Math.random() * sy);
		let direction = Math.floor(Math.random() * 3 + 1);
		this.direction = direction;
		switch(direction){
			case 1:
			this.liste.unshift([x,y],[x+1,y],[x+2,y]);
			break;
			case 2:
			this.liste.unshift([x,y],[x,y+1],[x,y+2]);
			break;
			case 3:
			this.liste.unshift([x,y],[x,y-1],[x,y-2]);
			break;
			case 4:
			this.liste.unshift([x,y],[x-1,y],[x-2,y]);
			break;
		}
	}

	getBodyDir(){
		var x1 = this.liste[0][0];
		var y1 = this.liste[0][1];
		var x2 = this.liste[1][0];
		var y2 = this.liste[1][1];
		if ( x1 == x2 + 1){
			return 1;
		}
		if ( x1 == x2 - 1){
			return 3;
		}
		if ( y1 == y2 + 1){
			return 2;
		}
		else return 4;
	}

	constructor(sx, sy){


	    this.liste = new Array(0); //liste des maillons
		this.vivant = true; //vivant
		this.resetBody(sx, sy)

	}
}
