var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// HEARTBIT
app.get("/", async function (request, response){

	r ={
		'massage': 'Nothing to sand'	
	};
	response.json(r);	
	//response.send("<html><h1>Saludos Mortales<\h1><\html>");
});

app.post("/echo", async function (request, response){
	const cid = request.body.id;
	const clat = request.body.lat;
	const clong = request.body.long;

	r = {
		'id_e': cid,
		'lat_e': clat,
		'long_e':clong
	};

	response.json(r);
});

app.post("/fragmenta",async function(request, response){
	console.log("Entered endpoint fragmenta");

	const cid = request.body.id;
	let arrayLat = request.body.lat.split(".");
	let arrayLong = request.body.long.split(".");

	r = {
		'id_e': cid,
		'lat_i_e': arrayLat[0],
		'lat_d_e': arrayLat[1],
		'long_i_e': arrayLong[0],
		'long_d_e': arrayLong[1]
	}
	
	response.json(r);
});
//URL
//argumentos
//funcion
//forma de retornar valores

app.listen(3000,"127.0.0.1",function(){
	console.log('App ejemplo')
});
