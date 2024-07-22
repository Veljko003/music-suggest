import jsonwebtoken from "jsonwebtoken"
import { ForbiddenError } from "@/api/errors"
import config from "@/config"

const auth = async (ctx) => {
  const {
    req: {
      cookies: { [config.security.jwt.cookieName]: sessionToken }
    },
    next
  } = ctx

  try {
    const { payload } = jsonwebtoken.verify(
      sessionToken,
      config.security.jwt.secret
    )

    ctx.session = payload

    await next()
  } catch (err) {
    throw new ForbiddenError()
  }
}

export default auth
