	var model = new Model(document.getElementById("taille").value);
	var view = new View(document.getElementById("taille").value);
	const app = new Controller(model, view)
  app.run();
