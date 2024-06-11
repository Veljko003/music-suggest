import { nameValidator } from "@/utils/validators"
import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import SuggestionModel from "@/db/models/SuggestionModel"
import { HTTP_ERRORS } from "@/api/constants"

const handle = mw({
  POST: [
    validate({
      body: {
        enseigne: nameValidator,
        shopName: nameValidator,
        email: nameValidator,
        title: nameValidator,
        artist: nameValidator,
        link: nameValidator
      }
    }),
    async ({
      res,
      input: {
        body: { enseigne, shopName, email, title, artist, link }
      }
    }) => {
      try {
        const suggestion = await SuggestionModel.query().insert({
          enseigne,
          shopName,
          email,
          title,
          artist,
          link
        })

        res.send({
          result: suggestion,
          message: "Suggestion submitted successfully"
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error submitting suggestion:", error)
        res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).send({
          error: "Internal Server Error"
        })
      }
    }
  ],
  GET: [
    async ({ res }) => {
      const query = SuggestionModel.query()
      const suggestions = await query.clone()

      res.send({
        result: suggestions
      })
    }
  ]
})

export default handle
