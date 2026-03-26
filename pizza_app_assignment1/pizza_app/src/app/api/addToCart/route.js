export async function GET(req) {
  console.log("In the api page");

  const { searchParams } = new URL(req.url);

  const item = searchParams.get('item');
  const des = searchParams.get('des');
  const size = searchParams.get('size');
  const price = searchParams.get('price');
  const img = searchParams.get('img');
  const username = searchParams.get('username');   // ✅ NEW

  console.log({ item, des, size, price, img, username });

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('cart');

  // Insert username along with the item
  const result = await collection.insertOne({
    item,
    des,
    size,
    price,
    img,
    username   
  });

  return Response.json({ data: "ok" });
}
