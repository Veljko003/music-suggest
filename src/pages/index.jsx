import Link from "next/link"

const RedirectUserContainer = ({ userType, message }) => (
  <div className="text-center">
    <h1 className="font-semibold text-xl">Vous êtes {userType} ?</h1>
    <span>{message}</span>
  </div>
)
const IndexPage = () => (
  <div className="flex flex-col items-center justify-center h-screen space-y-20">
    <h1 className="text-6xl font-semibold">
      Suggérer la musique | MIDI-AGENCY
    </h1>
    <RedirectUserContainer
      userType="client"
      message="Alors, allez sur le lien qui vous a été envoyé par notre équipe MIDI 😊🎵"
    />
    <RedirectUserContainer
      userType="admin"
      message={
        <Link href="/sign-in" className="hover:text-blue-700">
          Alors, connectez-vous en cliquant ici
        </Link>
      }
    />
  </div>
)

export default IndexPage
