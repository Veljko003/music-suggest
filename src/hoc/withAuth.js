import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "loading") return // Do nothing while loading
      if (!session) {
        console.log("No session found, redirecting to sign-in")
        router.replace("/sign-in")
      }
    }, [session, status, router])

    if (status === "loading") {
      return <div>Loading...</div>
    }

    if (!session) {
      console.log("No session, redirecting")
      return null // Prevent rendering the wrapped component if not authenticated
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
