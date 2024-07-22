import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Button from "@/web/components/buttons/Button"
import Icon from "@/web/components/Icon"

const MenuItem = (props) => {
  const { linkTo, listItemLabel, onClick } = props

  return (
    <Link
      href={linkTo}
      onClick={onClick}
      className="block px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white rounded">
      {listItemLabel}
    </Link>
  )
}

const Navbar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = () => {
    router.push("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-slate-100">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-2">
          <div className="md:hidden">
            <Icon
              icon="hamburger"
              className="w-6 h-6 cursor-pointer text-gray-800"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex-grow flex items-center justify-end">
            <ul
              className={`flex-col md:flex-row md:flex gap-4 list-none ${
                isMenuOpen ? "flex" : "hidden"
              } md:flex`}>
              <MenuItem
                linkTo="/backoffice/create-client-pages"
                listItemLabel="Créer des pages client"
                onClick={toggleMenu}
              />
              <MenuItem
                linkTo="/backoffice/client-pages"
                listItemLabel="Pages clients"
                onClick={toggleMenu}
              />
              <MenuItem
                linkTo="/backoffice/suggestions"
                listItemLabel="Suggestions"
                onClick={toggleMenu}
              />
            </ul>
            <Button btnLabel="Déconnexion" onClick={handleSignOut} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
