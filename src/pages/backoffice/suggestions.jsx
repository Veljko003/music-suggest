import { useQuery } from "@tanstack/react-query"

import apiClient from "@/web/services/apiClient"
import Title from "@/web/components/Title"
import Loader from "@/web/components/Loader"

export const getServerSideProps = async () => {
  const data = await apiClient("/suggestions")

  return {
    props: { initialData: data }
  }
}
const SuggestionDisplayTable = ({ suggestions }) => (
  <table className="w-full mt-10">
    <thead>
      <tr>
        {[
          "#",
          "Enseigne",
          "Boutique",
          "E-mail",
          "Titre",
          "Artiste",
          "Lien"
        ].map((label) => (
          <th
            key={label}
            className="p-4 bg-slate-400 text-center font-semibold">
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {suggestions.map(
        ({ id, enseigne, shopName, email, title, artist, link }) => (
          <tr key={id} className="even:bg-green-100 text-center">
            <td className="p-2">{id}</td>
            <td className="p-2">{enseigne}</td>
            <td className="p-2">{shopName}</td>
            <td className="p-2">{email}</td>
            <td className="p-2">{title}</td>
            <td className="p-2">{artist}</td>
            <td className="p-2">{link}</td>
          </tr>
        )
      )}
    </tbody>
  </table>
)
const Suggestions = (props) => {
  const { initialData } = props
  const {
    isFetching,
    data: { result: suggestions }
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () => apiClient("/suggestions"),
    initialData,
    enabled: false
  })

  return (
    <>
      <Title title="Suggestions" />
      <div className="relative">
        {isFetching && <Loader />}
        <SuggestionDisplayTable suggestions={suggestions} />
      </div>
    </>
  )
}

export default Suggestions
