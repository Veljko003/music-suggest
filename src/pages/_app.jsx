import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/web/styles/globals.css"
import HeadPage from "@/web/components/HeadPage"
import { SessionProvider } from "@/web/components/SessionContext"

const client = new QueryClient()
const App = ({ Component, pageProps }) => (
  <>
    <QueryClientProvider client={client}>
      <SessionProvider>
        <HeadPage />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  </>
)

export default App
