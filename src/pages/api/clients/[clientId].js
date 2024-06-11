import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import ClientModel from "@/db/models/ClientModel"
import { idValidator } from "@/utils/validators"

const handle = mw({
  DELETE: [
    validate({
      query: {
        clientId: idValidator
      }
    }),
    async ({
      input: {
        query: { clientId }
      },
      res
    }) => {
      const client = await ClientModel.query()
        .findById(clientId)
        .throwIfNotFound()

      await client.$query().delete()

      res.send(client)
    }
  ],
  GET: [
    validate({
      query: {
        clientId: idValidator
      }
    }),
    async ({
      input: {
        query: { clientId }
      },
      res
    }) => {
      const client = await ClientModel.query()
        .findById(clientId)
        .throwIfNotFound()

      res.send(client)
    }
  ]
})

export default handle
