import { useMutation } from "@tanstack/react-query"

import apiClient from "@/web/services/apiClient"
import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import LinkField from "@/web/components/forms/LinkField"
import Title from "@/web/components/Title"

const initialValues = {
  enseigne: "",
  shopName: "",
  email: "",
  title: "",
  artist: "",
  link: ""
}
const ClientPage = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post("/suggestions", { ...values })
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)

    resetForm()
    return true
  }

  return (
    <>
      <Title title="A votre tour de nous suggérer un titre" />
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormField name="enseigne" type="text" label="Enseigne:" />
        <FormField name="shopName" type="text" label="Boutique:" />
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
    </>
  )
}

export default ClientPage
