import { ObjectId } from "mongodb";

export async function up(db, client) {
  const subcategories = await db.collection("subcategories").find({}).toArray();

  const grouped = subcategories.reduce((acc, sub) => {
    const catId = sub.category.toString();
    if (!acc[catId]) acc[catId] = [];
    acc[catId].push(sub._id);
    return acc;
  }, {});

  const updates = Object.entries(grouped).map(([catId, subs]) =>
    db
      .collection("categories")
      .updateOne({ _id: new ObjectId(catId) }, { $set: { subcategory: subs } }),
  );

  return Promise.all(updates);
}

export async function down(db, client) {
  return db
    .collection("categories")
    .updateMany({}, { $unset: { subcategory: "" } });
}
