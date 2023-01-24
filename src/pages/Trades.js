/*
Trades view

This is a functional component that represents a page for a user to manage a trade.
The component uses the hooks useSelector to access the global state of the store.

It then sets the trades variable to the value of the list property in the tradeData 
object in the Redux store.

It then returns a JSX element that displays the trades using the UserTradeList component, 
passing it the trades variable. If there are no trades found, it will display a message 
saying "No trades found."
*/

import React from 'react'
import { useSelector } from 'react-redux'

import { UserTradeList } from '../components/user/UserTradeList'
import Typography from '@mui/material/Typography'



export function Trades() {
    const trades = useSelector(state => state.tradeData.list)

    return (
        <div>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Trades
            </Typography>
            <UserTradeList trades={trades} />
            {trades.length === 0 ?
                <>
                    <br></br>
                    <Typography variant="body1" sx={{ marginLeft: "40px" }} gutterBottom>
                        <em>No trades found.</em>
                    </Typography>
                </> : <></>
            }
            <br></br>
            <Typography variant="body1" sx={{ marginLeft: "40px" }} gutterBottom>
                <em>Go to the Home page and search for a card name to start a new trade.</em>
            </Typography>
        </div>
    )
}