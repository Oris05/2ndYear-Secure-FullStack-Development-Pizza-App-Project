export async function GET(req) {
  console.log("In the register API");

  const { searchParams } = new URL(req.url);

  const username = searchParams.get('username');
  const pass = searchParams.get('pass');
  const firstname = searchParams.get('firstname');
  const secondname = searchParams.get('secondname');
  const address = searchParams.get('address');

  console.log({ username, pass, firstname, secondname, address });

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('users');   // ✅ correct collection

  // Insert user record
  const result = await collection.insertOne({
    username,
    pass,
    firstname,
    secondname,
    address
  });

  return Response.json({ data: "ok" });
}
