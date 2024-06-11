import { useMutation } from "@tanstack/react-query"

import apiClient from "@/web/services/apiClient"
import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import Title from "@/web/components/Title"
import ErrorMessage from "@/web/components/ErrorMessage"

const initialValues = {
  clientName: ""
}
const CreateCustomClientPages = () => {
  const { mutateAsync, error } = useMutation({
    mutationFn: (values) => apiClient.post("/clients", { ...values })
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)

    resetForm()
    return true
  }

  return (
    <>
      <Title title="Créer la page client personnalisées" />
      <ErrorMessage error={error} />
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormField name="clientName" type="text" label="Client:" />
        <SubmitButton btnLabel="Créer la page client" onSubmit={handleSubmit} />
      </Form>
    </>
  )
}

export default CreateCustomClientPages
