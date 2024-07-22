import { useState } from "react"
import { useRouter } from "next/router"
import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import Title from "@/web/components/Title"
import { useSession } from "@/web/components/SessionContext"
import ErrorMessage from "@/web/components/alert-messages/ErrorMessage"

const initialValues = {
  username: "",
  password: ""
}
const SignInPage = () => {
  const { saveSessionToken } = useSession()
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = (values) => {
    const { username, password } = values
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      const token = "dummyToken"
      saveSessionToken(token)
      router.push("/backoffice")
    } else {
      setError("Invalid credentials. Please try again.")
    }
  }

  return (
    <>
      <Title title="Connexion" />
      {error && <ErrorMessage error={error} />}
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormField name="username" type="text" label="Nom d'utilisateur:" />
        <FormField name="password" type="password" label="Mot de passe:" />
        <SubmitButton btnLabel="Connexion" />
      </Form>
    </>
  )
}

export default SignInPage
