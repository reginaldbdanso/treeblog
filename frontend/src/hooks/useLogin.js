import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [Loading, setLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    const response = await fetch(`${process.env.REACT_APP_USER_API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setLoading(false)
    }
  }

  return { login, Loading, error }
}