import Link from "next/link"
import { useRouter } from "next/router"
import Button from "@/web/components/buttons/Button"

const MenuItem = (props) => {
  const { linkTo, listItemLabel } = props

  return (
    <>
      <Link href={linkTo} className="no-underline">
        <li className="list-none p-2 hover:bg-blue-600 hover:text-white">
          {listItemLabel}
        </li>
      </Link>
    </>
  )
}
const Navbar = () => {
  const router = useRouter()
  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <header className="border-b-2 bg-slate-100">
      <div className="flex p-3">
        <nav className="ms-auto">
          <ul className="flex h-full gap-16 items-center list-none text-base">
            <MenuItem
              linkTo="/backoffice/create-client-pages"
              listItemLabel="Créer des pages client"
            />
            <MenuItem
              linkTo="/backoffice/client-pages"
              listItemLabel="Pages clients"
            />
            <MenuItem
              linkTo="/backoffice/suggestions"
              listItemLabel="Suggestions"
            />
            <Button btnLabel="Déconnexion" onClick={handleSignOut} />
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
