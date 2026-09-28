# Aplicaciones Distribuidas

Este repositorio contiene tareas y proyectos desarrollados para la materia de Aplicaciones Distribuidas.  
El objetivo principal es aplicar los conceptos vistos en clase.
# Apuntes!
When we create a Restful API, it needs to satisfy two conditions
 - Use JSON as input/output
 - Use the HTTPS methods (aka verbs) GET, POST, SET, etc


## Practica 1
### TODO
- Add SSL
-  Send files and assets when a petition arrives, not absurd html code

### 08/feb/2026

I installed NodeJS in my laptop.

I used npm to install express.

I created a project using "npm init"

I used the following code, provided by the teacher:


	var express = require("express");
	var app = express();

	app.use(express.json());
	app.use(express.urlencoded({extended: true}));

	app.get("/", async function (request, response){

		r ={
			'sausage': 'Nothing to eat'	
		};
	
		response.json(r);
	});

	app.listen(3000, function(){
		console.log('App ejemplo')
	});


I ran it on my laptop

I could get the message in my phone and desktop's browser using the url

	"http://192.168.100.10:3000"

Then I configured a DHCP rule, so  my laptop can have a static IP address

Then I configured my DNS so I could assign a name to that address, which is sosztests.online

Then I installed nginx in my laptop, then I enabled and started it using 

	systemctl start nginx
	systemctl enable nginx

So whenever I searched for

	http://sosztests.online

I got reddirected to the nginX home page. WHen I appended the 3000 port to the URL, I got my JSON message again.

Then I configured nginx so it forwards all http petitions on port 80 to port 3000, for that, I edited my /etc/nginx/nginx.conf file and added this lines

	server {
	        listen       80;
	        server_name  sosztests.online;
		
		location /
		{
			proxy_pass http://localhost:3000;
			proxy_set_header Host $host;
	               proxy_set_header X-Real-IP $remote_addr;
	               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	               proxy_set_header X-Forwarded-Proto $scheme;
		}

I got a warning when I ran 

	sudo nginx -t


SO I added these lines

 	types_hash_max_size 2048;
 	types_hash_bucket_size 128;

To finish this, I changed my nodeJS code to send a simple HTML page instead of a json file:

	var express = require("express");
	var app = express();
	
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	
	app.get("/", async function (request, response){
	
		r ={
			'sausage': 'Nothing to eat'	
		};
		//response.json(r);	
		response.send("<html><h1>Saludos Mortales<\h1><\html>");
	});
	
	app.listen(3000, function(){
		console.log('App ejemplo')
	});

Finally, I modified the 'app.listen()' function

	app.listen(3000, "127.0.0.1" ,function(){

This way the WebServer only listens the localhost incoming petitions. That way I cannot acces to it directly from another device, the only way is the NGINX reverse proxy. 

And now, if I insert this url in my web broswer of my phone, desktop or whatever on my LAN, I et my wimple html page.
All of this steps using an SSH session, where I had to isntall openssh in my laptop and use 'ssh username@ip' to connect from my desktop to my laptop 
