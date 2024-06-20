import Button from "@/web/components/buttons/Button"

const ConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  warningMessageHead
}) => {
  if (!show) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-4">{warningMessageHead}</p>
        <div className="flex justify-end mt-6 space-x-4">
          <Button btnLabel="Supprimer" onClick={onConfirm} />
          <Button btnLabel="Annuler" onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
