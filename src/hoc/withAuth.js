import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Loader from "@/web/components/Loader"

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "loading") return // Do nothing while loading
      if (!session) router.replace("/sign-in")
    }, [session, status, router])

    if (status === "loading" || !session) {
      return <Loader />
    }

    return <WrappedComponent {...props} />
  }

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return WithAuth
}

export default withAuth
