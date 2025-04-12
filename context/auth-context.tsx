"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
}

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async ({ email, password, rememberMe }: LoginCredentials) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate a successful login if email contains "@" and password is at least 6 chars
    if (!email.includes("@") || password.length < 6) {
      throw new Error("Invalid credentials")
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0],
      email,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  // Register function
  const register = async ({ name, email, password }: RegisterData) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate a successful registration
    if (!email.includes("@") || password.length < 6) {
      throw new Error("Invalid registration data")
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
