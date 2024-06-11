import { nameValidator } from "@/utils/validators"
import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import ClientModel from "@/db/models/ClientModel"
import { HTTP_ERRORS } from "@/api/constants"

const handle = mw({
  POST: [
    validate({
      body: {
        clientName: nameValidator
      }
    }),
    async ({
      res,
      input: {
        body: { clientName }
      }
    }) => {
      try {
        const client = await ClientModel.query().insert({
          clientName
        })

        res.send({
          result: client,
          message: "Client page created successfully"
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error creating client page:", error)
        res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).send({
          error: "Internal Server Error"
        })
      }
    }
  ]
})

export default handle
