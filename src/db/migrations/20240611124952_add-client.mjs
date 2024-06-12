export const up = async (knex) => {
  await knex.schema.createTable("clients", (table) => {
    table.increments("id")
    table.text("clientName").notNullable().unique()
    table.text("backgroundColor").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("clients")
}
