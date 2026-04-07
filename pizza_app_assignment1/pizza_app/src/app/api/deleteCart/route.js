import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
  // get URL params
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // cart item id
  
  // mongo connection
  const url = "mongodb://root:example@localhost:27017/";
  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect(); // connect to db
  const db = client.db(dbName);
  const collection = db.collection("cart"); // cart collection

  // delete item by id
  await collection.deleteOne({ _id: new ObjectId(id) });

  // send response
  return Response.json({ success: true });
}
