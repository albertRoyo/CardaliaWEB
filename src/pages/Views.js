/*
View router

This is a functional component called Views. It is responsible for determining what views should be 
rendered based on whether the user is logged in or not.

The component uses the useSelector hook from the react-redux library to check if there is a token in 
the state, which indicates that the user is logged in. If there is a token, it renders the AppBarViews 
component. If there is no token, it renders the Login component and the Register component.

The AppBarViews component is a nested component that renders the AppBarCustom component and the Routes 
component. The Routes component is used to define different routes in the app and the corresponding 
component that should be rendered when the route is accessed.

The AppBarViews component also uses the useInitialize hook, which is a custom hook that is responsible 
for initializing the user data and card data when the component is rendered.

The Views component controls what views should be rendered based on the user's login status and the 
AppBarViews component controls the routing and the navigation bar of the app.
*/

import React from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux'

import useInitialize from '../hooks/Initialize'
import { AppBarCustom } from "../components/AppBar"
import { Login } from './Login'
import { Register } from './Register'
import { Home } from "./Home"
import { Trades } from "./Trades"
import { Trade } from "./Trade"
import { Collection } from "./Collection"
import { UserProfile } from "./UserProfile"
import { StartTrade } from "./StartTrade"


export function Views() {
    const token = useSelector(state => state.userData.token)

    return (
        <div>
            {token ?
                <Routes>
                    <Route path="/*" element={<AppBarViews />} />
                </Routes> :
                <Routes>
                    <Route path="/*" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            }
        </div>
    )
}

function AppBarViews() {
    useInitialize()

    return (
        <>
            <AppBarCustom />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/newtrade" element={<StartTrade />} />
            </Routes>
        </>
    )
}


