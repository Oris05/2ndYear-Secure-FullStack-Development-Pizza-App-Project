import { MongoClient } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  const url = "mongodb://root:example@localhost:27017/";
  const client = new MongoClient(url);
  const dbName = "app";

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("cart");

  // If username missing → delete items with null/empty username
  if (!username || username === "null" || username === "undefined" || username.trim() === "") {
    await collection.deleteMany({
      $or: [
        { username: null },
        { username: "" },
        { username: { $exists: false } }
      ]
    });

    return Response.json({ success: true, deleted: "null/empty username items" });
  }

  // Otherwise delete all items for that username
  await collection.deleteMany({ username });

  return Response.json({ success: true, deleted: username });
}
