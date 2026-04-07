export async function GET(req) {
  console.log("In the api page");

  // get URL params
  const { searchParams } = new URL(req.url);

  // incoming values
  const item = searchParams.get('item');     // item name
  const des = searchParams.get('des');       // description
  const size = searchParams.get('size');     // size
  const price = searchParams.get('price');   // price
  const img = searchParams.get('img');       // image url
  const username = searchParams.get('username'); // user

  console.log({ item, des, size, price, img, username });

  // mongo import
  const { MongoClient } = require('mongodb');

  // mongo connection string
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  // connect to db
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('cart'); // cart collection

  // insert into cart
  const result = await collection.insertOne({
    item,
    des,
    size,
    price,
    img,
    username
  });

  // send response
  return Response.json({ data: "ok" });
}
