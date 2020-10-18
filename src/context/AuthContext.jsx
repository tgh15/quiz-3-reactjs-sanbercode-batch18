import React, { useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [user, setUser] = useState({
        username: 'admin',
        password: 'admin'
    })
    const [isLogin, setIsLogin] = useState(false)

    const check = (data) => {
        if (user.username === data.username && user.password === data.password) {
            return setIsLogin(true)
        }
        return false
    }
    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser, check }}>
            {props.children}
        </AuthContext.Provider>
    )
}
