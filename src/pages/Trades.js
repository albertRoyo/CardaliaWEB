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
                        No trades found.
                    </Typography>
                </> : <></>
            }
            <br></br>
            <Typography variant="body1" sx={{ marginLeft: "40px" }} gutterBottom>
                Go to the <em>Home page</em> and search for a card name to start a new trade.
            </Typography>
        </div>
    );
}