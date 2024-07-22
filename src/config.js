import { boolean, object, string } from "yup"

const validationSchema = object({
  db: object({
    client: string().oneOf(["pg"]).required(),
    connection: string().required()
  }).noUnknown(),
  security: object({
    jwt: object({
      cookieName: string().required(),
      secret: string().min(32).required(),
      expiresIn: string().required(),
      secure: boolean().required()
    }).noUnknown()
  }).noUnknown()
}).noUnknown()
const data = {
  db: {
    client: "pg",
    connection: process.env.DB__CONNECTION
  },
  security: {
    jwt: {
      cookieName: "sessionToken",
      secret: process.env.NEXT_PUBLIC_SECURITY__JWT__SECRET,
      expiresIn: "2 hours",
      secure: process.env.NODE_ENV === "production"
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
    process.exit(1)
  }

  return null
})()

export default config
