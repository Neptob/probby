type ConfirmPopupProps = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmPopup({ message, onConfirm, onCancel }: ConfirmPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm">
        <p className="text-white text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl bg-gray-800 text-gray-300 text-sm"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPopup
