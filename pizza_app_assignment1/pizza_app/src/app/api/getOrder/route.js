export async function GET(req) {
  console.log("In the api page");

  const { searchParams } = new URL(req.url);

  const item = searchParams.get('name');
  const price = searchParams.get('price');

  console.log({ item,price});

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('orders');

  // Insert ONLY these fields
  const result = await collection.insertOne({
    item,
    price
  });

  return Response.json({ data: "ok" });
}