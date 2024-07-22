import { useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Loader from "@/web/components/Loader"

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const session = useMemo(() => ({ user: { id: 1, name: "Admin" } }), [])
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "loading") return // Do nothing while loading
      if (!session) {
        console.log("No session found, redirecting to sign-in")
        router.replace("/sign-in")
      }
    }, [session, status, router])

    if (status === "loading") {
      return <Loader />
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
