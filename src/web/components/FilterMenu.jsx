import Icon from "@/web/components/Icon"

const Label = ({ label }) => (
  <span className="text-sm mb-1 font-semibold">{label}</span>
)
const FilterMenuHeader = ({ handleResetClick, onClose }) => (
  <div className="flex justify-between items-center mb-2">
    <button
      onClick={handleResetClick}
      className="text-black-500 hover:text-gray-700 focus:outline-none">
      Réinitialiser
    </button>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700 focus:outline-none">
      <Icon icon="x" className="h-6 w-6" />
    </button>
  </div>
)
const FilterContainer = ({ children, isOpen }) => (
  <div
    className={`fixed top-20 right-0 bg-white shadow-md p-4 z-10 transition-transform transform ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
    style={{ minWidth: "200px" }}>
    {children}
  </div>
)
const ClientFilter = ({ clients, selectedClients, setSelectedClients }) => {
  const handleCheckboxChange = (client) => {
    if (selectedClients.includes(client)) {
      setSelectedClients(selectedClients.filter((c) => c !== client))
    } else {
      setSelectedClients([...selectedClients, client])
    }
  }

  return (
    <div>
      <Label label="Clients:" />
      {clients.map((client) => (
        <div key={client} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`client-${client}`}
            checked={selectedClients.includes(client)}
            onChange={() => handleCheckboxChange(client)}
            className="mr-2"
          />
          <label htmlFor={`client-${client}`}>{client}</label>
        </div>
      ))}
    </div>
  )
}
const FilterMenu = ({
  isOpen,
  onClose,
  clients,
  selectedClients,
  setSelectedClients,
  handleApplyFilters
}) => {
  const handleResetClick = () => {
    setSelectedClients([])
    handleApplyFilters([])
    onClose()
  }

  return (
    <FilterContainer isOpen={isOpen}>
      <FilterMenuHeader handleResetClick={handleResetClick} onClose={onClose} />
      <div className="space-y-4">
        <ClientFilter
          clients={clients}
          selectedClients={selectedClients}
          setSelectedClients={setSelectedClients}
        />
      </div>
    </FilterContainer>
  )
}

export default FilterMenu
