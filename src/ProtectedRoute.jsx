import React from 'react'
import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isLogin } = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={(props) => (
                isLogin ? <Component {...props} /> : <Redirect to='/login' />
            )}
        />
    )
}

export default ProtectedRoute
