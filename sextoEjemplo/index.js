const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
  const uri = "mongodb+srv://sosasantanaluisemiliano_db_user:<db_password>@cluster0.8csy5q4.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(uri, { 
      serverApi: {
    	version: ServerApiVersion.v1,
    	strict: true,
    	deprecationErrors: true,
      }
 });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
