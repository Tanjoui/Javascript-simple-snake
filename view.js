class View {
	constructor() {}

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
