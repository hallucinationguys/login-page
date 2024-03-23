'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  postAuthRegister,
  postAuthLogin,
  UsermodelUserResponse,
  getProfile,
} from 'src/api'
import { isSSR } from '@dwarvesf/react-utils'
import { emitter } from 'src/utils/emitter'
import { WithChildren } from '../types/common'

interface AuthContextValues {
  isLogin: boolean
  login: (email: string, password: string) => Promise<any>
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
  ) => Promise<any>
  logout: () => void
  user?: UsermodelUserResponse
}

const tokenKey = 'hgf-token'
const tokenKeyExpires = 'hgf-token-expires'
const userKey = 'hgf-user'

const getToken = () => window.localStorage.getItem(tokenKey)
const cleanAuth = () => {
  window.localStorage.removeItem(tokenKey)
  window.localStorage.removeItem(tokenKeyExpires)
  window.localStorage.removeItem(userKey)
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthContextProvider({ children }: WithChildren) {
  const [isLogin, setIsLogin] = useState(() => {
    return isSSR() ? false : Boolean(window.localStorage.getItem(tokenKey))
  })

  const [user, setUser] = useState<UsermodelUserResponse>()

  const logout = useCallback(() => {
    setIsLogin(false)
    cleanAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    if (!email) {
      throw new Error('email is missing')
    }
    if (!password) {
      throw new Error('password is missing')
    }

    try {
      const res = await postAuthLogin({ email, password })
      if (res.access_token && res.expired_at) {
        setIsLogin(true)
        window.localStorage.setItem(tokenKey, res.access_token)
        window.localStorage.setItem(tokenKeyExpires, res.expired_at)
      }
    } catch (error) {
      throw error
    }
  }, [])

  const registerUser = useCallback(
    async (
      first_name: string,
      last_name: string,
      email: string,
      password: string,
      confirmPassword: string,
      phone: string,
    ) => {
      try {
        if (!first_name) {
          throw new Error('first_name is missing')
        }
        if (!last_name) {
          throw new Error('last_name is missing')
        }
        if (!email) {
          throw new Error('email is missing')
        }
        if (!password) {
          throw new Error('password is missing')
        }
        if (!confirmPassword) {
          throw new Error('confirmPassword is missing')
        }
        if (!phone) {
          throw new Error('phone is missing')
        }

        if (confirmPassword === password) {
          const res = await postAuthRegister({
            first_name,
            last_name,
            email,
            password,
            phone,
          })
          if (res.status_code === 200) {
            await login(email, password)
          }
        }
      } catch (error) {
        throw error
      }
    },
    [],
  )

  const fetchUserInfo = useCallback(async () => {
    try {
      const res = await getProfile()
      if (res.data) {
        setUser(res.data)
        // Save user info to local storage
        window.localStorage.setItem(userKey, JSON.stringify(res.data))
      }
    } catch {
      // Failed to fetch user profile -> force logout
      logout()
    }
  }, [logout])

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (isLogin) {
        // Retrieve user info from local storage first
        const userRaw = window.localStorage.getItem(userKey)
        if (userRaw) {
          try {
            setUser(JSON.parse(userRaw) as UsermodelUserResponse)
          } catch {
            fetchUserInfo()
          }
        } else {
          fetchUserInfo()
        }
      }
    }

    bootstrapAsync()
    emitter.on('FORCE_LOGOUT', logout)
    return () => {
      emitter.off('FORCE_LOGOUT', logout)
    }
  }, [isLogin, logout, fetchUserInfo])

  return (
    <AuthContext.Provider
      value={{ isLogin, login, user, registerUser, logout }}
    >
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

export { getToken }
