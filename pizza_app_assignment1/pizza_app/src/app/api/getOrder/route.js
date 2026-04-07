export async function POST(req) {
  // read array of items
  const items = await req.json(); // [{item, price}, ...]

  // mongo connection
  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('orders'); // orders collection

  // insert many items
  await collection.insertMany(items);

  return Response.json({ data: "ok" });
}
