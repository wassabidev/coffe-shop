export async function up(db, client) {
  return db.collection("users").updateMany({}, { $set: { activo: true } });
}

export async function down(db, client) {
  return db.collection("users").updateMany({}, { $unset: { activo: "" } });
}
