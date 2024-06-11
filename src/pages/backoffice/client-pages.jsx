import { useQuery, useMutation } from "@tanstack/react-query"

import apiClient from "@/web/services/apiClient"
import Title from "@/web/components/Title"
import Loader from "@/web/components/Loader"
import Button from "@/web/components/buttons/Button"

export const getServerSideProps = async () => {
  const data = await apiClient("/clients")

  return {
    props: { initialData: data }
  }
}
const ClientsDisplayTable = ({ clients, handleDelete }) => (
  <table className="w-full mt-10">
    <thead>
      <tr>
        {["Client", "🗑️"].map((label) => (
          <th
            key={label}
            className="p-4 bg-slate-300 text-center font-semibold">
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {clients.map(({ id, clientName }) => (
        <tr key={id} className="even:bg-green-100 text-center">
          <td className="p-2">{clientName}</td>
          <td className="p-2">
            <Button
              btnLabel="❌"
              variant="styless"
              data-id={id}
              onClick={() => handleDelete(id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
const CustomClientPages = (props) => {
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
    mutationFn: (clientId) => apiClient.delete(`clients/${clientId}`)
  })
  const handleDelete = async (clientId) => {
    await deleteClient(clientId)
    await refetch()
  }

  return (
    <>
      <Title title="Clients" />
      <div className="relative">
        {isFetching && <Loader />}
        <ClientsDisplayTable clients={clients} handleDelete={handleDelete} />
      </div>
    </>
  )
}

export default CustomClientPages
