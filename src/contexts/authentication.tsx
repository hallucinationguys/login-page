'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { WithChildren } from '../types/common'
import { ResponseResponse, postApiAuthenticationLogin } from 'src/api'

interface AuthContextValues {
  isLogin: boolean
  login: (email: string, password: string) => Promise<any>
  user?: ResponseResponse
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthContextProvider({ children }: WithChildren) {
  const [isLogin, setIsLogin] = useState<boolean>(
    typeof window !== 'undefined' && window.localStorage.token,
  )

  const [user, setUser] = useState<ResponseResponse>()
  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await postApiAuthenticationLogin({ email, password }, {})
      if (res.data) {
        setIsLogin(true)
        let data = JSON.stringify(res.data.data)
        window.localStorage.setItem('token', String(data))
      }
    } catch (error) {
      throw new Error('Incorrect email or password')
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLogin, login, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return context
}
