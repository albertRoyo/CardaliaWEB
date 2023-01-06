import React from 'react'
import { useSelector } from 'react-redux'

import { UserTradeList } from '../components/user/UserTradeList'
import Typography from '@mui/material/Typography'



export function Trades() {
    const trades = useSelector(state => state.tradeList.list)

    return (
        <div>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Trades
            </Typography>
            <UserTradeList trades={trades} />
        </div>
    );
}