import { MongoClient } from "mongodb";

export async function GET(req) {
  // read ?username=
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username"); // user

  // mongo connection
  const url = "mongodb://root:example@localhost:27017/";
  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect(); // connect to db
  const db = client.db(dbName);
  const collection = db.collection("cart"); // cart collection

  // delete items with no username
  // delete items with no username
if (!username || username === "null") {

  // make a list of things that count as empty usernames
  const emptyStuff = [
    { username: null },
    { username: "" },
    { username: { $exists: false } }
  ];

  // delete everything that matches the list
  await collection.deleteMany({
    $or: emptyStuff
  });
  }

  // delete items for this username
  await collection.deleteMany({ username });
}
