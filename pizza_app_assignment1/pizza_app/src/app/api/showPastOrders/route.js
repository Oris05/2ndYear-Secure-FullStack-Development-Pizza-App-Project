export async function GET(req, res) {

  // mongo import + connection
  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect(); // connect to db
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('orders'); // past order collection

  // read ?user=
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user"); // username filter

  let result;

  // if user provided → filter by username
  if (user) {
    result = await collection.find({ username: user }).toArray();
  } else {
    // else return all cart items
    result = await collection.find({}).toArray();
  }

  // send response
  return Response.json(result);
}
