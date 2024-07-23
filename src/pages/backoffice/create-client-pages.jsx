import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"
import { CldUploadButton } from "next-cloudinary"

import apiClient from "@/web/services/apiClient"
import Form from "@/web/components/forms/Form"
import FormField from "@/web/components/forms/FormField"
import SubmitButton from "@/web/components/buttons/SubmitButton"
import Title from "@/web/components/Title"
import ErrorMessage from "@/web/components/alert-messages/ErrorMessage"
import SuccessMessage from "@/web/components/alert-messages/SuccessMessage"
import Navbar from "@/web/components/Navbar"

const initialValues = {
  clientName: "",
  backgroundImage: null
}
const CreateCustomClientPages = () => {
  const router = useRouter()
  const [image, setImage] = useState(null)
  const { mutateAsync, isSuccess, error } = useMutation({
    mutationFn: async (values) => {
      return apiClient.post("/clients", values)
    }
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync({ ...values, backgroundImage: image })

    resetForm()
    return true
  }

  if (isSuccess) {
    setTimeout(() => {
      router.push("/backoffice/client-pages")
    }, 3000)
  }
  const handleUpload = (result) => {
    setImage(result.info.secure_url)
  }

  return (
    <>
      <Navbar />
      <Title title="Créer la page client personnalisées" />
      <ErrorMessage error={error} />
      {isSuccess && (
        <SuccessMessage>
          Page créée avec succès ! Redirection vers la liste des pages client...
        </SuccessMessage>
      )}
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormField name="clientName" type="text" label="Client:" />
        <div className="flex flex-col gap-2 mb-4 items-start">
          <span className="font-semibold text-lg">
            Image de fond d&apos;écran:
          </span>
          <CldUploadButton
            uploadPreset="client_page_upload"
            onSuccess={handleUpload}
            className="w-[300px] rounded-md p-2 border-[1px] border-solid border-slate-800 hover:bg-stone-100">
            Télécharger l&apos;image
          </CldUploadButton>
        </div>
        <SubmitButton btnLabel="Créer la page client" onSubmit={handleSubmit} />
      </Form>
    </>
  )
}

export default CreateCustomClientPages
