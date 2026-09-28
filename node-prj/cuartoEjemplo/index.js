var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//heartbit
app.get("/", async function (request, response){

	r = {
		"message" : "everything ok!"
	}
	response.json(r);
});
app.post("/saludo", async function (request, response){
	try
	{
		const name = request.body.nombre;

		r = {
			"estado": "0",
			"mensage": "Hola, " + name
		}

		response.json(r);

	}
	catch(error)
	{
		r = {
			"estado": "1",
			"mensage": "Ha ocurrido un error" 
		}

		response.json(r);

	}
});
app.listen(3000, "127.0.0.1", function(){

	console.log("Quinta Practica");
});
