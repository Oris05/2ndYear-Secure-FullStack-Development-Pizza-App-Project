export async function GET(req, res) {
  // read ?username= & ?pass=
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username'); // user
  const pass = searchParams.get('pass');         // password

  // mongo import + connection
  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect(); // connect to db

  const db = client.db(dbName);
  const collection = db.collection('users'); // users collection

  // check login
  const user = await collection.findOne({ username, pass });

  // return array (your frontend expects array)
  return Response.json(user ? [user] : []);
}
