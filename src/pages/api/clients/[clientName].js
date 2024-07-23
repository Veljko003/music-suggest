import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import ClientModel from "@/db/models/ClientModel"
import { nameValidator } from "@/utils/validators"

const handle = mw({
  DELETE: [
    validate({
      query: {
        clientName: nameValidator
      }
    }),
    async ({
      input: {
        query: { clientName }
      },
      res
    }) => {
      const client = await ClientModel.query()
        .findOne({ clientName })
        .throwIfNotFound()

      await client.$query().delete()

      res.send(client)
    }
  ],
  GET: [
    validate({
      query: {
        clientName: nameValidator
      }
    }),
    async ({
      input: {
        query: { clientName }
      },
      res
    }) => {
      const client = await ClientModel.query()
        .findOne({ clientName })
        .throwIfNotFound()

      res.send({
        clientName: client.clientName,
        backgroundImage: client.backgroundImage
      })
    }
  ]
})

export default handle
