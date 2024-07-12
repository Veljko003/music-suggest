import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import SequelizeAdapter from "@auth/sequelize-adapter"
import { Sequelize } from "sequelize"

const sequelize = new Sequelize(process.env.DB__CONNECTION, {
  dialect: "postgres"
})

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (
          credentials.username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
          credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {
          return { id: 1, name: "Admin" }
        }
        return null
      }
    })
  ],
  adapter: SequelizeAdapter(sequelize),
  session: {
    jwt: true
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      return session
    }
  },
  pages: {
    signIn: "/sign-in"
  }
})
