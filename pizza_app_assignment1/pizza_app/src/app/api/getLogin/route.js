export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const pass = searchParams.get('pass');

  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('users');

  // ⭐ Correct login check
  const user = await collection.findOne({ username, pass });

  // ⭐ Return array to match your frontend logic
  return Response.json(user ? [user] : []);
}
