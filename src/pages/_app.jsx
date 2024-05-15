import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/web/styles/globals.css"
import HeadPage from "@/web/components/HeadPage"

const client = new QueryClient()
const App = ({ Component, pageProps }) => (
  <>
    <QueryClientProvider client={client}>
      <HeadPage />
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
)

export default App
