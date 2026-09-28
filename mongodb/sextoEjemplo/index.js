require("node:dns/promises").setServers(["8.8.4.4", "8.8.8.8"]);
var express = require("express");
var app = express(); //Contenedor de Endpoints o WS Restful
const { MongoClient } = require("mongodb");
var client = 0;

var dbName = "DBProyectos";
var collectionName = "ProyectosNumba5";

// Create references to the database and collection in order to run
// operations on them.
var database = 0;
var collection = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function prepareDB() {
  dbName = "DBProyectos";
  collectionName = "ProyectosNumba5";

  // Create references to the database and collection in order to run
  // operations on them.
  database = client.db(dbName);
  collection = database.collection(collectionName);
}

async function getSequenceNextValue(seqName) {
  database = client.db(dbName);
  collection = database.collection(collectionName);

  var seqDoc = await collection.findOneAndUpdate(
    { _id: seqName },
    { $inc: { seqValue: 1 } },
    {
      returnDocument: 'after',
      upsert: true
    }
  );
  console.log(seqDoc.seqValue);
  return seqDoc.seqValue;
}
async function countElements(){
  database = client.db(dbName);
  collection = database.collection(collectionName);
  const data = await collection.find().toArray();
  console.log(data.length); 
  return data.length;
}


async function connectDB() {
  const uri =
    "mongodb+srv://sosasantanaluisemiliano_db_user:QJIVwMe6wUUuU2ap@cluster0.8csy5q4.mongodb.net/?appName=Cluster0";

  client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();
}

app.get("/", async function (request, response) {
  r = {
    message: "Nothing to send",
  };

  response.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
https://typesofwebservices.noesierra.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv001", async function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  r = {
    user_id: user_id,
    token: token,
    geo: geo,
  };

  res.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
https://typesofwebservices.noesierra.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv0010", async function (req, res) {
  const user_id1 = req.query.id;
  const token1 = req.query.token;
  const geo1 = req.query.geo;

  r1 = {
    user_id: user_id1,
    token: token1,
    geo: geo1,
  };

  res.json(r1);
});

// Call this service sending payload in body: raw - json
/*
{
    "id": "nope",
    "token": "ertydfg456Dfgwerty",
    "geo": "12345678,34567890"
}
*/
app.post("/serv002", async function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  r = {
    user_id: user_id,
    token: token,
    geo: geo,
  };

  res.json(r);
});

/*
Call this service sending parameter as a part of the URL
https://typesofwebservices.noesierra.repl.co/serv003/1234567
*/
app.post("/serv003/:info", async function (req, res) {
  const info = req.params.info;
  let r = { info: info };
  res.json(r);
});
app.delete("/receipt/deletep", async function (req, res){
  const deleteId = req.body.project_id;
  console.log(deleteId);
  var result = ""
  try{
    result = await collection.deleteOne({project_id: deleteId})
    console.log("Element deleted successfully!");
  } catch(e){
    result = console.log(e)
  }
  let r = {result: result};
  res.json(r);
});
app.post("/receipt/insert", async function (req, res) {
  const insertedDocument = [
    {
      project_id: await countElements()+1,
      project_name: req.body.project_name,
      project_manager: req.body.project_manager,
      project_participants: req.body.project_participants,
      project_duration_days: req.body.project_duration_days,
      project_due_date:req.body.project_due_date
    }
  ];

  let result = "";

  try {
    const insertManyResult = await collection.insertMany(insertedDocument);
    console.log(
      `${insertManyResult.insertedCount} documents successfully inserted.\n`,
    );
    result = `${insertManyResult.insertedCount} documents successfully inserted.`;
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`,
    );
    result = `Something went wrong trying to insert the new documents: ${err}`;
  }
  let r = { result: result };
  res.json(r);
});

app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  connectDB();
  prepareDB();
});
