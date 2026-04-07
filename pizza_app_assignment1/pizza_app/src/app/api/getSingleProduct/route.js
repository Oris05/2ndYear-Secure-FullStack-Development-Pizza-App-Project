import { ObjectId } from "mongodb";

export async function GET(req, res) {
  console.log("In the api page");

  // read ?id=
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // product id

  // mongo connection
  const { MongoClient } = require('mongodb');
  const uri = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(uri);

  const dbName = 'app';

  await client.connect(); // connect to db
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('products'); // products collection

  // find product by id
  const item = await collection.findOne({
    _id: new ObjectId(id)
  });

  console.log('Found documents =>', item);

  // send response
  return Response.json({ item });
}
