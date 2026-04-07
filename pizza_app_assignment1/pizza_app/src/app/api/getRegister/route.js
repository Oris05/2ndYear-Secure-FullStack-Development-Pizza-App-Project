export async function GET(req) {
  console.log("In the register API");

  // read URL params + trim
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username')?.trim();   // username
  const pass = searchParams.get('pass')?.trim();           // password
  const firstname = searchParams.get('firstname')?.trim(); // first name
  const secondname = searchParams.get('secondname')?.trim(); // last name
  const address = searchParams.get('address')?.trim();     // address

  console.log({ username, pass, firstname, secondname, address });

  // mongo connection
  const { MongoClient } = require('mongodb');
  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect(); // connect to db
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('users'); // users collection

  // insert user
  await collection.insertOne({
    username,
    pass,
    firstname,
    secondname,
    address
  });

  return Response.json({ data: "ok" });
}
