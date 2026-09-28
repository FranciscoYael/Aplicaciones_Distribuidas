const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function iterateFunc(doc) {
   console.log(JSON.stringify(doc, null, 4));
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findAllData(client) {
  const cursor = await client.db("sample_mflix").collection("movies").find({}).limit(2);
  // Convertir cursor a array de documentos
  const results = await cursor.toArray();
  console.log("Title: ",results[0]['title']);

  // Mostrar resultados
  console.log("Películas encontradas:");
  console.log(JSON.stringify(results, null, 2));
  
}

async function main() {
const uri = "mongodb+srv://nsierrar:kasPQXbv648FvVxT@cluster0.k84ecox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
    await findAllData(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
