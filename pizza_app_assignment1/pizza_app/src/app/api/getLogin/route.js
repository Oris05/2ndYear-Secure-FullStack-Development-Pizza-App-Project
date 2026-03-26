export async function GET(req, res) {

  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')   // changed
  const pass = searchParams.get('pass')

  console.log(username);
  console.log(pass);

  console.log("in the api page")

  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('users');

  const findResult = await collection.find({ "username": username }).toArray(); // changed

  console.log('Found documents =>', findResult);

  return Response.json(findResult)
}
