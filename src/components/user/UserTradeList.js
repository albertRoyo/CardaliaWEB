/*
User Trade List

This is a React functional component that renders a list of user trades based on the trades prop passed 
to it. The component returns JSX element that uses the List and ListItem components from Material-UI to 
create an unordered list of user trades.

It starts by using the getSelectionNumber function to calculate the total number of cards selected by 
the user and the other user in the trade and returns it as a string.

It also uses the getStatus function to calculate the status of the trade, whether it's finished, waiting 
on the user to confirm, waiting on the other user to confirm, or pending.

It maps through the trades prop and creates a ListItem for each trade. Each ListItem contains a link to 
the trade page and passes the trade data as state to the link.
*/

import React from 'react'
import { Link } from "react-router-dom"

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Tooltip from '@mui/material/Tooltip'

export const UserTradeList = ({ trades }) => {

    const getSelectionNumber = (trade) => {
        let totalYou = 0
        for (let i = 0; i < trade.whatYouTrade.length; i += 1) {
            totalYou = totalYou + trade.whatYouTrade[i].select
        }
        let totalHe = 0
        for (let i = 0; i < trade.whatHeTrade.length; i += 1) {
            totalHe = totalHe + trade.whatHeTrade[i].select
        }

        return '(' + totalYou + ', ' + totalHe + ')'
    }

    const getStatus = (trade) => {
        if (trade.heChecked & trade.youChecked) return "Finished"
        else if (trade.heChecked & !trade.youChecked) return "Waiting you to confirm trade"
        else if (!trade.heChecked & trade.youChecked) return "Waiting " + trade.username + " to confirm the trade"
        else return "Pending trade"

    }


    return (
        <>
            <Tooltip title="Click a trade to open it" >
                <List sx={{ marginLeft: "40px" }}>
                    {trades.map((trade) => (
                        <ListItem key={trade.username + trade.youChecked + trade.heChecked}>
                            <Link to="/trade" state={trade}>
                                <em>{trade.username}</em> &nbsp;&nbsp;&nbsp;&nbsp;
                                Selections: <em>{getSelectionNumber(trade)}</em> &nbsp;&nbsp;&nbsp;&nbsp;
                                Status: <em>{getStatus(trade)}</em>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Tooltip>
        </>
    )
}