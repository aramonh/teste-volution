const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'node-restapi';

// Create a new MongoClient


// Use connect method to connect to the Server

export async function connect(){
    try{
            const client =  await  MongoClient.connect(url,{ useUnifiedTopology: true } );

            const db = client.db(dbName);
            if(db){
                console.log("DB is Connected");
            }
            return db;
    }
    catch(error){
        console.log("ERROR CONNECT DB");
    }
}

  









