import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import "@/web/styles/globals.css"
import HeadPage from "@/web/components/HeadPage"
import { SessionProvider } from "@/web/components/SessionContext"

const client = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <QueryClientProvider client={client}>
      <SessionProvider>
        <HeadPage />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  </SessionProvider>
)

export default App
