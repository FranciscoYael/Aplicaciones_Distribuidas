//TODO AGREGAR LOS ENDPOINTS CONCAT, Y LOS ULTIMOS DOS. ME QQUEDE HACIENDO CONCAT

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

app.post("/mascaracteres", async function (request, response){

	const priCad = request.body.primeraCadena;
	const segCad = request.body.segundaCadena;
	let errorCode;
	let responseCad;
	try{
		if(priCad.length == 0 || segCad.length == 0)
		{
			errorCode = 1;
			responseCad = 'Una de las cadenas esta vacia.';
		}
		else if( priCad.length > segCad.length )
		{
			errorCode = 0;
			responseCad = priCad;
		}
		else if (priCad.length < segCad.length)
		{

			errorCode = 0;
			responseCad = segCad;
		}
		else
		{
			errorCode = 0;
			responseCad = priCad;
		}

		r = {
			'masCaracteres:' : responseCad,
			'errorCode' : errorCode
		};
	}
	catch (error)
	{
		r = {
			'msg': 'Ha ocurrido un error',
			'errorCoda' : '1'
		}

		response.json(r);
	}
});
app.post("/menoscaracteres", async function (request, response){

	const priCad = request.body.primeraCadena;
	const segCad = request.body.segundaCadena;
	let errorCode;
	let responseCad;
	
	try
	{
		if(priCad.length == 0 || segCad.length == 0)
		{
			errorCode = 1;
			responseCad = 'Una de las cadenas esta vacia.';
		}
		else if( priCad.length < segCad.length )
		{
			errorCode = 0;
			responseCad = priCad;
		}
		else if (priCad.length > segCad.length)
		{

			errorCode = 0;
			responseCad = segCad;
		}
		else
		{
			errorCode = 0;
			responseCad = priCad;
		}

		    
		r = {
			'menosCaracteres:' : responseCad,
			'errorCode' : errorCode
		};

		response.json(r);
	}
	catch (error)
	{
		r = {
			'msg': 'Ha ocurrido un error',
			'errorCoda' : '1'
		}

		response.json(r);
	}

});
app.post("/numcaracteres", async function (request, response){

	try
	{
		r = {
			"lenght" : request.body.cadena.length,
			"errorCode" : "0"
		}
		response.json(r);
	}
	catch(error)
	{
		r = {
			"msg" : "An error has ocurred",
			"errorCode" : "1"
		}	
		response.json(r);
	}
});
app.post("/palindroma", async function (request, response){

	try
	{
		const cadena = request.body.cadena.toLowerCase();
		let result = true;
		for(let i = 0 ; i <= Math.floor(cadena.length / 2) - 1; i++)
		{
			if(cadena[i] != cadena.split('').toReversed()[i])
			{
				result = false;
			}
		}

		r = {
			"palindroma" : result,
			"errorCode" : "0"
		}
		response.json(r);
	}
	catch(error)
	{
		r = {
			"error":"hubo un error",
			"errorCode": "1"
		}
		response.json(r);
	}


});

app.post("/concat", async function(request, response){

	try
	{
		const priCad = request.body.primeraCadena;
		const segCad = request.body.segundaCadena;
		const cadConcat = priCad + segCad;
		
		if(priCad == "" || segCad == "")
		{
			r ={
				"msg" : "Llena las cadenas!",
				"errorCode" : "1"
			}
			response.json(r);
		}
		else if(priCad == null || segCad == null)
		{
			r ={
				"msg" : "Faltan campos!",
				"errorCode" : "1"
			}
			response.json(r);
		}
		else
		{
			r ={
				"msg" : cadConcat,
				"errorCode" : "0"
			}
			response.json(r);

		}
	}
	catch(error)
	{
		r = {
			"msg":"Ha ocurrido un error",
			"errorCode": "1"
		}
		response.json(r);
	}
});
app.post("/applysha256", async function(request, response){

	  function sha256FromBlob(blob) {
	  const buffer = await blob.arrayBuffer();
	  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	  const hashArray = Array.from(new Uint8Array(hashBuffer));
	  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	  }

	const myBlob = new Blob(['some data'], { type: 'text/plain' });
	sha256FromBlob(myBlob).then(hash => console.log(hash));

});
app.listen(3000,"127.0.0.1",function(){
	console.log('App ejemplo')
});
