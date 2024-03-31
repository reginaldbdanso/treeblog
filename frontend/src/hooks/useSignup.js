import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setLoading(true)
        setError(null)
        const response = await fetch(`${process.env.REACT_APP_USER_API_URL}/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        } else {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setLoading(false)
        }

    }

    return { signup, error, loading }
}
export default useSignup;