import { createContext, useState, useContext } from 'react'
import { getUserProfile, saveUserProfile } from '../store'
import type { UserProfile } from '../types'

type UserProfileContextType = {
  profile: UserProfile
  updateName: (name: string) => void
}

const UserProfileContext = createContext<UserProfileContextType | null>(null)

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile)

  function updateName(name: string) {
    const updated = { ...profile, name: name.trim() }
    saveUserProfile(updated)
    setProfile(updated)
  }

  return (
    <UserProfileContext.Provider value={{ profile, updateName }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useUserProfile must be used inside UserProfileProvider')
  return ctx
}
