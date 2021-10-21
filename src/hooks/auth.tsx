import React, { createContext, useContext, useEffect, useState } from 'react'

import * as AuthSession from 'expo-auth-session'
import { api } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SCOPE = 'read:user'
const CLIENT_ID = 'a2f069f51953aad80930'
const USER_STORAGE = '@nlwheat:user'
const TOKEN_STORAGE = '@nlwheat:token'

interface UserData {
  id: string
  avatar_url: string
  name: string
  login: string
}

interface AuthContextData {
  user: UserData | null
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

interface AuthResponse {
  token: string
  user: UserData
}

interface AuthorizationResponse {
  params: {
    code?: string
    error?: string
  }
  type?: string
}

interface Props {
  children: React.ReactNode
}

function AuthProvider(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    async function loadUserStorageData() {
      const storagePromises = [AsyncStorage.getItem(USER_STORAGE), AsyncStorage.getItem(TOKEN_STORAGE)]
      const [userStorage, tokenStorage] = await Promise.all(storagePromises)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        setUser(JSON.parse(userStorage))
      }
    }

    loadUserStorageData()
  }, [])

  async function signIn() {
    setIsLoading(true)

    try {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
      const authSessionResponse = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post<AuthResponse>('authenticate', { code: authSessionResponse.params.code })
        const { token, user: userResponse } = authResponse.data

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(userResponse)

        const storagePromises = [AsyncStorage.setItem(USER_STORAGE, JSON.stringify(userResponse)), AsyncStorage.setItem(TOKEN_STORAGE, token)]
        await Promise.all(storagePromises)
      }
    } catch (ex) {
      console.log(ex)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    setUser(null)

    const storagePromises = [AsyncStorage.removeItem(USER_STORAGE), AsyncStorage.removeItem(TOKEN_STORAGE)]
    await Promise.all(storagePromises)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        signIn,
        signOut,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
