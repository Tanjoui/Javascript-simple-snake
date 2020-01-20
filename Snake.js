class Snake {

	getListe(){
		return this.liste;
	}

	constructor(){
	    this.direction = 1; //direction par défaut = bas
	    this.liste = new Array(0); //liste des maillons
	    //tete = liste[0]
	    this.vivant = true; //vivant
	    this.liste.unshift([5,5],[6,5],[7,5]); //on ajoute 2 maillons au serpent
	}
}
