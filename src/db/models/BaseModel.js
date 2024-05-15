import Knex from "knex"
import { Model } from "objection"
import knexConfig from "../../../knexfile.mjs"
import BaseQueryBuilder from "../BaseQueryBuilder.js"

const knex = Knex(knexConfig)
Model.knex(knex)

class BaseModel extends Model {
  static QueryBuilder = BaseQueryBuilder
}

export default BaseModel
