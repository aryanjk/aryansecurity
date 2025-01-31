import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserRoutes() {
    // get user information
    const user = JSON.parse(localStorage.getItem('user'))

    // check user
    // check admin=true
    // if true:accessall  the route of admin(Outlet)
    // if false:Nagivate to login

    return user != null ? <Outlet />
        : <Navigate to={'/login'} />
}

export default UserRoutes