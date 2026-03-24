export async function GET(req) {
  console.log("In the api page");

  const { searchParams } = new URL(req.url);

  const item = searchParams.get('item');
  const des = searchParams.get('des');
  const size = searchParams.get('size');
  const price = searchParams.get('price');
  const img = searchParams.get('img');

  console.log({ item, des, size, price, img });

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('cart');

  // Insert ONLY these fields
  const result = await collection.insertOne({
    item,
    des,
    size,
    price,
    img
  });

  return Response.json({ data: "ok" });
}