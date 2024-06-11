export const up = async (db) => {
  await db.schema.alterTable("suggestions", (table) => {
    table.timestamp("created_at").defaultTo(db.fn.now()).notNullable()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("suggestions", (table) => {
    table.dropColumn("created_at")
  })
}
