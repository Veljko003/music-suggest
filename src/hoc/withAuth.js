import { useEffect, useMemo } from "react"
import { useRouter } from "next/router"

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const session = useMemo(() => ({ user: { id: 1, name: "Admin" } }), [])
    const router = useRouter()

    useEffect(() => {
      if (!session) {
        console.log("No session found, redirecting to sign-in")
        router.replace("/sign-in")
      }
    }, [session, router])

    if (!session) {
      console.log("No session, redirecting")
      router.replace("/sign-in")
    }

    console.log("Session found", session)
    return <WrappedComponent {...props} />
  }

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return WithAuth
}

export default withAuth
