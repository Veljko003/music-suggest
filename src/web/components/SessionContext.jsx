import { createContext, useContext, useEffect, useState } from "react"
import config from "@/web/config"

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = (props) => {
  const [session, setSession] = useState(null)

  const saveSessionToken = (jwt) => {
    localStorage.setItem(config.security.session.storageKey, jwt)

    const payload = { username: process.env.NEXT_PUBLIC_ADMIN_USERNAME }
    setSession(payload)
  }

  const signOut = () => {
    localStorage.removeItem(config.security.session.storageKey)
    setSession(null)
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.session.storageKey)
    if (jwt) {
      const payload = { username: process.env.NEXT_PUBLIC_ADMIN_USERNAME }
      setSession(payload)
    }
  }, [])

  return (
    <SessionContext.Provider
      {...props}
      value={{
        session,
        saveSessionToken,
        signOut
      }}
    />
  )
}
