import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import SuggestionModel from "@/db/models/SuggestionModel"
import { idValidator } from "@/utils/validators"

const handle = mw({
  DELETE: [
    validate({
      query: {
        suggestionId: idValidator
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
