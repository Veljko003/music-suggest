import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"

import apiClient from "@/web/services/apiClient"
import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import LinkField from "@/web/components/forms/LinkField"
import Title from "@/web/components/Title"
import Container from "@/web/components/Container"

const initialValues = {
  shopName: "",
  email: "",
  title: "",
  artist: "",
  link: ""
}
const ClientPage = () => {
  const router = useRouter()
  const client = router.query.customClientPage
  const backgroundImage = router.query.backgroundImage
  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      apiClient.post("/suggestions", { ...values, client })
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)

    resetForm()
    router.push("/thanks")
    return true
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Container>
        <Title title="A votre tour de nous suggérer un titre" />
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          <FormField name="shopName" type="text" label="Boutique / Espace:" />
          <FormField
            name="email"
            type="email"
            label="Contact mail (optionnel):"
          />
          <div className="mt-3 mb-3">
            <FormField name="title" type="text" label="Titre:" />
            <FormField name="artist" type="text" label="Artiste:" />
          </div>

          <LinkField name="link" label="Lien (Spotify, YouTube):" />

          <SubmitButton btnLabel="Envoyer" onSubmit={handleSubmit} />
        </Form>
      </Container>
    </div>
  )
}

export default ClientPage
