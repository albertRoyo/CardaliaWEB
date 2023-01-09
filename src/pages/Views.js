import React, { useEffect } from "react"
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
    const userCollection = useSelector(state => state.cardsList.list)

    useEffect(() => {
        if (userCollection.length === 0) {
            //alert.info('Your collection is empty. Add cards before starting a trade')
        }
        // eslint-disable-next-line
    }, [])



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


