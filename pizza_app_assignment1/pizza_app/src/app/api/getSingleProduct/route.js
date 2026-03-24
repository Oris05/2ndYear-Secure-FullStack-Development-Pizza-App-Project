import {ObjectId} from "mongodb";

export async function GET(req, res) {
        // Make a note we are on
        // the api. This goes to the console.
        console.log("In the api page")
        const { searchParams } = new URL(req.url);
          const id = searchParams.get("id");

        // =================================================

        const { MongoClient } = require('mongodb');
        const uri = 'mongodb://root:example@localhost:27017/';
        const client = new MongoClient(uri);

        const dbName = 'app'; // database name

        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('products'); // collection name

  const item = await db.collection("products").findOne({
    _id: new ObjectId(id),
  });
        console.log('Found documents =>', item);

   //==========================================================

        // at the end of the process we need to send something back.
        return Response.json({item})
  }