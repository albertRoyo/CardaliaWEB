import React from 'react'
import { Link } from "react-router-dom"

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

export const UserTradeList = ({ trades }) => {

    const getSelectionNumber = (trade) => {
        let total = 0
        for (let i = 0; i < trade.whatYouTrade.length; i += 1) {
            total = total + trade.whatYouTrade[i].select
        }

        return total
    }

    const getStatus = (trade) => {
        if (trade.heChecked & trade.youChecked) return "Finished"
        else if (trade.heChecked & !trade.youChecked) return "Waiting you to confirm trade"
        else if (trade.heChecked & trade.youChecked) return "Waiting " + trade.username + " to confirm the trade"

    }


    return (
        <>
            <Tooltip title="Click a trade to open it" >
                {trades.length !== 0 ?
                    <List sx={{ marginLeft: "40px" }}>
                        {trades.map((trade) => (
                            <ListItem key={trade.username}>
                                <Link to="/trade" state={trade}>
                                    <em>{trade.username}</em> with {getSelectionNumber(trade)} selections &nbsp;&nbsp;&nbsp;&nbsp; Status: <em>{getStatus(trade)}</em>
                                </Link>
                            </ListItem>
                        ))}
                    </List> :
                    <>
                        <br></br>
                        <Typography variant="body1" sx={{ marginLeft: "40px" }} gutterBottom>
                            No trades found
                        </Typography>
                    </>
                }
            </Tooltip>
        </>
    )
}