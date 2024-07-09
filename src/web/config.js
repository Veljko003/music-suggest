import { object, string } from "yup"

const validationSchema = object({
  api: object({
    baseUrl: string().required()
  }).noUnknown(),
  security: object({
    session: object({
      storageKey: string().required()
    })
  })
}).noUnknown()
const data = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API__BASE_URL
  },
  security: {
    session: {
      storageKey: "sessionToken"
    }
  }
}
const config = (() => {
  try {
    return validationSchema.validateSync(data, {
      stripUnknown: true,
      abortEarly: false
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }

  return null
})()

export default config
