import "@/web/styles/globals.css"
import HeadPage from "@/web/components/HeadPage"

const App = ({ Component, pageProps }) => (
  <>
    <HeadPage />
    <Component {...pageProps} />
  </>
)

export default App
