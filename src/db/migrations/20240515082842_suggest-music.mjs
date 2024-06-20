export const up = async (knex) => {
  await knex.schema.createTable("suggestions", (table) => {
    table.increments("id")
    table.text("shopName").notNullable()
    table.text("email").notNullable()
    table.text("title").notNullable()
    table.text("artist").notNullable()
    table.text("link").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("suggestions")
}
