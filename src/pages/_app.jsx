import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import "@/web/styles/globals.css"
import HeadPage from "@/web/components/HeadPage"

const client = new QueryClient()

const App = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <QueryClientProvider client={client}>
      <HeadPage />
      <Component {...pageProps} />
    </QueryClientProvider>
  </SessionProvider>
)

export default App
