import { useQuery, useMutation } from "@tanstack/react-query"
import { useState, useMemo } from "react"

import apiClient from "@/web/services/apiClient"
import Title from "@/web/components/Title"
import Loader from "@/web/components/Loader"
import Button from "@/web/components/buttons/Button"
import ConfirmationModal from "@/web/components/ConfirmationModal"
import { formatDateTimeShort } from "@/utils/formatters"
import SortSelect from "@/web/components/SortSelect"
import { getSortedSuggestions } from "@/utils/sort"
import RefreshButton from "@/web/components/buttons/RefreshButton"
import FilterMenu from "@/web/components/FilterMenu"
import Icon from "@/web/components/Icon"
import withAuth from "@/hoc/withAuth"

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
          "Client",
          "Boutique / Espace",
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
        ({ id, shopName, email, title, artist, link, created_at, client }) => (
          <tr key={id} className="even:bg-green-100 text-center">
            <td className="p-2">{client}</td>
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
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [suggestionToDelete, setSuggestionToDelete] = useState(null)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [selectedClients, setSelectedClients] = useState([])
  const [sortOption, setSortOption] = useState("")
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
  const handleDelete = (suggestionId) => {
    setSuggestionToDelete(suggestionId)
    setShowConfirmation(true)
  }
  const confirmDelete = async () => {
    setShowConfirmation(false)

    if (suggestionToDelete) {
      await deleteSuggestion(suggestionToDelete)
      await refetch()
    }
  }
  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setSuggestionToDelete(null)
  }
  const sortedSuggestions = useMemo(
    () => getSortedSuggestions(suggestions, sortOption),
    [suggestions, sortOption]
  )
  const filteredSuggestions = useMemo(
    () =>
      sortedSuggestions.filter(
        (suggestion) =>
          selectedClients.length === 0 ||
          selectedClients.includes(suggestion.client)
      ),
    [sortedSuggestions, selectedClients]
  )
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }
  const onClickFilter = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen)
  }
  const closeFilterMenu = () => {
    setIsFilterMenuOpen(false)
  }
  const handleApplyFilters = (clients) => {
    setSelectedClients(clients)
    closeFilterMenu()
  }
  const uniqueClients = [
    ...new Set(suggestions.map((suggestion) => suggestion.client))
  ]

  return (
    <>
      <Title title="Suggestions" />
      <div className="flex flex-row justify-center mt-5">
        <Button
          onClick={onClickFilter}
          btnLabel={<Icon icon="filter" className="h-7 w-7" />}
          variant="styless"
        />
        <FilterMenu
          isOpen={isFilterMenuOpen}
          onClose={closeFilterMenu}
          clients={uniqueClients}
          selectedClients={selectedClients}
          setSelectedClients={setSelectedClients}
          handleApplyFilters={handleApplyFilters}
        />
        <SortSelect
          value={sortOption}
          onChange={handleSortChange}
          nameSort="Boutique"
        />
        <RefreshButton refresh={refetch} />
      </div>
      <div className="relative">
        {isFetching && <Loader />}
        <SuggestionDisplayTable
          suggestions={filteredSuggestions}
          handleDelete={handleDelete}
        />
      </div>
      <ConfirmationModal
        show={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={confirmDelete}
        warningMessageHead="Etes-vous sûr de vouloir supprimer cette suggestion?"
      />
    </>
  )
}

export default withAuth(Suggestions)
