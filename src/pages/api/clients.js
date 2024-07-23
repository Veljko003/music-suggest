import { nameValidator } from "@/utils/validators"
import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import ClientModel from "@/db/models/ClientModel"
import { HTTP_ERRORS } from "@/api/constants"

const handle = mw({
  GET: [
    async ({ res }) => {
      const query = ClientModel.query()
      const clients = await query.clone()

      res.send({
        result: clients
      })
    }
  ],
  POST: [
    validate({
      body: {
        clientName: nameValidator,
        backgroundImage: nameValidator
      }
    }),
    async ({
      res,
      input: {
        body: { clientName, backgroundImage }
      }
    }) => {
      try {
        const client = await ClientModel.query().insert({
          clientName,
          backgroundImage
        })

        res.send({
          result: client,
          message: "Client created successfully"
        })
      } catch (error) {
        console.error("Error creating client:", error)
        res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).send({
          error: "Internal Server Error"
        })
      }
    }
  ]
})

export default handle
