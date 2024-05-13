import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import LinkField from "@/web/components/forms/LinkField"

const initialValues = {
  shopName: "",
  title: "",
  artist: "",
  link: ""
}
const Home = () => {
  const handleSubmit = () => {
    //
  }
  return (
    <>
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormField name="shopName" type="text" label="Nom Boutique:" />
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
export default Home
