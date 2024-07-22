import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "@/web/components/SessionContext"
import Loader from "@/web/components/Loader"

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (!session) {
        router.replace("/sign-in")
      } else {
        setLoading(false)
      }
    }, [session, router])

    if (loading) {
      return <Loader />
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`

  return WithAuthComponent
}

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

export default withAuth
