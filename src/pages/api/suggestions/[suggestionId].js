import mw from "@/api/mw"
import { number } from "yup"
import { validate } from "@/api/middlewares/validate"
import SuggestionModel from "@/db/models/SuggestionModel"

const handle = mw({
  DELETE: [
    validate({
      query: {
        suggestionId: number().integer()
      }
    }),
    async ({
      input: {
        query: { suggestionId }
      },
      res
    }) => {
      const suggestion = await SuggestionModel.query()
        .findById(suggestionId)
        .throwIfNotFound()

      await suggestion.$query().delete()

      res.send(suggestion)
    }
  ]
})

export default handle
