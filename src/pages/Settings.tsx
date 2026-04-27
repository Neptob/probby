import { useState } from "react";
import { resetData } from "../store";
import { useUserProfile } from "../context/UserProfileContext";
import ConfirmPopup from "../components/ConfirmPopup";

function Settings() {
  const { profile, updateName } = useUserProfile()
  const [name, setName] = useState(profile.name);
  const [showResetPopup, setShowResetPopup] = useState(false);

  function handleSaveName() {
    updateName(name)
  }

  function handleReset() {
    resetData();
    window.location.reload();
  }

  return (
    <main className="pb-20 pt-4 px-4">
      <h1 className="text-white font-bold text-xl mb-6">Impostazioni</h1>

      <section className="mb-8">
        <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
          Profilo
        </h2>
        <div className="bg-gray-900 rounded-xl p-4">
          <label className="text-gray-400 text-xs block mb-2">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Determinated User"
            className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-amber-400 mb-3"
          />
          <button
            onClick={handleSaveName}
            className="w-full py-2 rounded-xl bg-amber-400 text-gray-950 text-sm font-semibold"
          >
            Salva
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
          Dati
        </h2>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-3">
            Cancella tutti i dati salvati e riporta l'app allo stato iniziale.
          </p>
          <button
            onClick={() => setShowResetPopup(true)}
            className="w-full py-2 rounded-xl bg-red-500/20 text-red-400 text-sm font-semibold"
          >
            Reset dati
          </button>
        </div>
      </section>

      {showResetPopup && (
        <ConfirmPopup
          message="Sei sicuro? Tutti i dati salvati verranno eliminati definitivamente."
          onConfirm={handleReset}
          onCancel={() => setShowResetPopup(false)}
        />
      )}
    </main>
  );
}

export default Settings;
