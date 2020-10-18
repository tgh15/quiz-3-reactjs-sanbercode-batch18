import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const [input, setInput] = useState({
        username: '',
        password: ''
    })
    const { isLogin, check } = useContext(AuthContext)
    if (isLogin) {
        return <Redirect to='/movie' />
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        check(input)
    }
    return (
        <section>
            <div style={{ padding: '10px', border: '1px solid #ccc' }}>
                <h1 style={{ textAlign: 'center' }}>Silahkan Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={handleChange} />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login
