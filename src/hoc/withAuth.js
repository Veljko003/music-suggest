import { useRouter } from "next/router"
import { useEffect } from "react"

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const session = { user: { id: 1, name: "Admin" } }
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
