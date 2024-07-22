import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import Title from "@/web/components/Title"

const initialValues = {
  username: "",
  password: ""
}
const SignInPage = () => {
  const handleSubmit = () => {
    //
  }

  return (
    <>
      <Title title="Connexion" />
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormField name="username" type="text" label="Nom d'utilisateur:" />
        <FormField name="password" type="password" label="Mot de passe:" />
        <SubmitButton btnLabel="Connexion" onSubmit={handleSubmit} />
      </Form>
    </>
  )
}

export default SignInPage
