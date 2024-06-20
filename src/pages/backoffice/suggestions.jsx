import { useQuery, useMutation } from "@tanstack/react-query"

import apiClient from "@/web/services/apiClient"
import Title from "@/web/components/Title"
import Loader from "@/web/components/Loader"
import Button from "@/web/components/buttons/Button"
import { formatDateTimeShort } from "@/utils/formatters"

export const getServerSideProps = async () => {
  const data = await apiClient("/suggestions")

  return {
    props: { initialData: data }
  }
}
const SuggestionDisplayTable = ({ suggestions, handleDelete }) => (
  <table className="w-full mt-10">
    <thead>
      <tr>
        {[
          "Boutique",
          "E-mail",
          "Titre",
          "Artiste",
          "Lien",
          "Date/Heure",
          "🗑️"
        ].map((label) => (
          <th
            key={label}
            className="p-4 bg-slate-300 text-center font-semibold">
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {suggestions.map(
        ({
          id,
          enseigne,
          shopName,
          email,
          title,
          artist,
          link,
          created_at
        }) => (
          <tr key={id} className="even:bg-green-100 text-center">
            <td className="p-2">{shopName}</td>
            <td className="p-2">{email}</td>
            <td className="p-2">{title}</td>
            <td className="p-2">{artist}</td>
            <td className="p-2">{link}</td>
            <td className="p-2">{formatDateTimeShort(new Date(created_at))}</td>
            <td className="p-2">
              <Button
                btnLabel="❌"
                variant="styless"
                data-id={id}
                onClick={() => handleDelete(id)}
              />
            </td>
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
    data: { result: suggestions },
    refetch
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () => apiClient("/suggestions"),
    initialData,
    enabled: false
  })
  const { mutateAsync: deleteSuggestion } = useMutation({
    mutationFn: (suggestionId) =>
      apiClient.delete(`suggestions/${suggestionId}`)
  })
  const handleDelete = async (suggestionId) => {
    await deleteSuggestion(suggestionId)
    await refetch()
  }

  return (
    <>
      <Title title="Suggestions" />
      <div className="relative">
        {isFetching && <Loader />}
        <SuggestionDisplayTable
          suggestions={suggestions}
          handleDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default Suggestions
