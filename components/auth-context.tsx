"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type User = { email: string }
type AuthContextType = {
  user: User | null
  login: (email: string, _password?: string) => Promise<void>
  signup: (email: string, _password?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = "stargrader_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null)
        } catch {
          setUser(null)
        }
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const api = useMemo<AuthContextType>(
    () => ({
      user,
      async login(email) {
        const u = { email: email.trim().toLowerCase() }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
        setUser(u)
      },
      async signup(email) {
        const u = { email: email.trim().toLowerCase() }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
        setUser(u)
      },
      async logout() {
        localStorage.removeItem(STORAGE_KEY)
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    // Safe fallback (should be wrapped by AuthProvider)
    return {
      user: null,
      login: async (_e: string) => {},
      signup: async (_e: string) => {},
      logout: async () => {},
    } as AuthContextType
  }
  return ctx
}
