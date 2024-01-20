'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { WithChildren } from '../types/common'
import { postAuthRegister, postAuthLogin, UsermodelUserResponse } from 'src/api'

interface AuthContextValues {
  isLogin: boolean
  login: (email: string, password: string) => Promise<any>
  user?: UsermodelUserResponse
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthContextProvider({ children }: WithChildren) {
  const [isLogin, setIsLogin] = useState<boolean>(
    typeof window !== 'undefined' && window.localStorage.token,
  )

  const [user, setUser] = useState<UsermodelUserResponse>()
  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await postAuthLogin({ email, password }, {})
      if (res.data) {
        setIsLogin(true)
        console.log(res.data.user)
        window.localStorage.setItem('token', String(res.data.access_token))
        window.localStorage.setItem(
          'token_expires',
          String(res.data.access_token_expires_at),
        )
      }
    } catch (error) {
      console.log(error)
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
