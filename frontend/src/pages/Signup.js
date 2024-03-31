import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, loading} = useSignup()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
    await signup(email, password)
    navigate('/')
    }

    return (
        <div className="signupi">

            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <label>Email address:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={loading}>{loading ? 'Loading...' : 'Signup'}</button>
                {error && <div className="error">{error}</div>}
                {/* <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Signup'}</button>
                {error && <div className="error">{error}</div>} */}
            </form>
        </div>
    )
}

export default Signup;