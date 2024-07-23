import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState, useMemo } from "react"

import apiClient from "@/web/services/apiClient"
import Title from "@/web/components/Title"
import Loader from "@/web/components/Loader"
import Button from "@/web/components/buttons/Button"
import ConfirmationModal from "@/web/components/ConfirmationModal"
import SortSelect from "@/web/components/SortSelect"
import { getSortedClients } from "@/utils/sort"
import RefreshButton from "@/web/components/buttons/RefreshButton"
import Navbar from "@/web/components/Navbar"

export const getServerSideProps = async () => {
  const data = await apiClient("/clients")

  return {
    props: { initialData: data }
  }
}

const ClientsDisplayTable = ({
  clients,
  handleClickViewPage,
  handleDelete
}) => (
  <table className="w-full mt-10">
    <thead>
      <tr>
        {["Client", "Image de fond d'écran", "Page", "🗑️"].map((label) => (
          <th
            key={label}
            className="p-4 bg-slate-300 text-center font-semibold">
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {clients.map(({ id, clientName, backgroundImage }) => (
        <tr key={id} className="even:bg-green-100 text-center">
          <td className="p-2">{clientName}</td>
          <td className="p-2">{backgroundImage}</td>
          <td className="p-2">
            <Button
              btnLabel="Voir la page"
              onClick={handleClickViewPage(clientName)}
            />
          </td>
          <td className="p-2">
            <Button
              btnLabel="❌"
              variant="styless"
              data-id={id}
              onClick={() => handleDelete(clientName)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
const CustomClientPages = (props) => {
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [clientToDelete, setClientToDelete] = useState(null)
  const [sortOption, setSortOption] = useState("")
  const { initialData } = props
  const {
    isFetching,
    data: { result: clients },
    refetch
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => apiClient("/clients"),
    initialData,
    enabled: false
  })
  const { mutateAsync: deleteClient } = useMutation({
    mutationFn: (clientName) => apiClient.delete(`clients/${clientName}`)
  })
  const handleClickViewPage = (clientName) => () => {
    router.push(`/${clientName}`)
  }
  const handleDelete = (clientName) => {
    setClientToDelete(clientName)
    setShowConfirmation(true)
  }
  const confirmDelete = async () => {
    setShowConfirmation(false)

    if (clientToDelete) {
      await deleteClient(clientToDelete)
      await refetch()
    }
  }
  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setClientToDelete(null)
  }
  const sortedClients = useMemo(
    () => getSortedClients(clients, sortOption),
    [clients, sortOption]
  )
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  return (
    <>
      <Navbar />
      <Title title="Clients" />
      <div className="flex flex-row justify-center mt-5">
        <SortSelect
          value={sortOption}
          onChange={handleSortChange}
          nameSort="Nom"
        />
        <RefreshButton refresh={refetch} />
      </div>
      <div className="relative">
        {isFetching && <Loader />}
        <ClientsDisplayTable
          clients={sortedClients}
          handleClickViewPage={handleClickViewPage}
          handleDelete={handleDelete}
        />
      </div>
      <ConfirmationModal
        show={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={confirmDelete}
        warningMessageHead="Etes-vous sûr de vouloir supprimer cette page?"
      />
    </>
  )
}

export default CustomClientPages
