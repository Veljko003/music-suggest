import { config as dotenvConfig } from "dotenv"

dotenvConfig({ path: ".env.local" })

const knexConfig = {
  client: "pg",
  connection: process.env.DB__CONNECTION,
  migrations: {
    directory: "./src/db/migrations",
    stub: "./src/db/migration.stub",
    loadExtensions: [".mjs"]
  },
  seeds: {
    directory: "./src/db/seeds",
    stub: "./src/db/seed.stub",
    loadExtensions: [".mjs"]
  }
}

export default knexConfig
