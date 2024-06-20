import { useRouter } from "next/router"
import Title from "@/web/components/Title"
import Button from "@/web/components/buttons/Button"

const ThanksPage = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-20">
      <Title title="Merci pour votre suggestion 😁" />
      <Button
        btnLabel="Voulez-vous suggérer un autre?"
        onClick={handleBackClick}
      />
    </div>
  )
}

export default ThanksPage
