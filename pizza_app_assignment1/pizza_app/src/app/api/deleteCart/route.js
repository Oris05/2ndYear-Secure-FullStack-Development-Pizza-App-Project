import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const url = "mongodb://root:example@localhost:27017/";
  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("cart");

  await collection.deleteOne({ _id: new ObjectId(id) });

  return Response.json({ success: true });
}
