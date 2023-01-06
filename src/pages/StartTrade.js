import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"

import { PostNewTrade, GetTrades } from "../services/Services"
import { setTrades } from '../reducers/TradeList.reducer'

import { CollectionSelect } from '../components/collection/CollectionSelect'
import Typography from '@mui/material/Typography'
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

export function StartTrade() {
    const location = useLocation()
    const userCollection = location.state

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.userData.token)
    const trade = {}
    const [whatHeTrade, setWhatHeTrade] = useState([])

    const handleMakeTrade = () => {
        console.log("trade: ", trade)
        PostNewTrade(trade, token)
            .then(response => {
                GetTrades(token)
                    .then(response => {
                        dispatch(setTrades(response.data.trades))
                        navigate("/trades")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        trade.whatHeTrade = whatHeTrade
        trade.whatYouTrade = []
        trade.username = userCollection.username
        // eslint-disable-next-line
    }, [whatHeTrade, userCollection.username])


    return (
        <div>
            <br></br>
            <Stack direction="row" spacing={7}>
                <Typography variant="h4" gutterBottom>
                    Welcome to <em>{userCollection.username}</em> collection
                </Typography>
                <Button variant="contained" color="primary" onClick={handleMakeTrade} sx={{ width: '100' }}>
                    Make Trade
                </Button>
            </Stack>
            <Typography variant="h6" gutterBottom>
                Select the cards you are interested in from <em>{userCollection.username}</em> collection to create a new trade
            </Typography>
            <CollectionSelect
                cardsList={userCollection.collection}
                tradeCards={whatHeTrade}
                setTrade={setWhatHeTrade}
            />
        </div>
    );
}
