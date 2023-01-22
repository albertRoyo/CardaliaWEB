import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

import { PostNewTrade, GetTrades } from "../services/Services"
import { setTrades } from '../reducers/TradeData.reducer'

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
    const [whatHeTrade, setWhatHeTrade] = useState([])
    const trade = { username: userCollection.username, whatHeTrade: whatHeTrade }
    const [isModified, setIsModified] = useState(false)

    const isSelections = () => {
        return whatHeTrade.length !== 0
    }

    const handleMakeTrade = () => {
        console.log("trade: ", trade)
        PostNewTrade(trade, token)
            .then(() => {
                GetTrades(token)
                    .then(response => {
                        Swal.fire({
                            position: 'bottom-end',
                            icon: 'success',
                            title: 'Trade started succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        dispatch(setTrades(response.data.trades))
                        navigate("/trades")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'A problem ocurred. Please, retry',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(err)
            })
    }
    const handleCancel = () => {
        navigate("/")
    }

    useEffect(() => {
        trade.whatHeTrade = whatHeTrade
        if (isSelections()) {
            setIsModified(true)
        }
        // eslint-disable-next-line
    }, [whatHeTrade])


    return (
        <div>
            <br></br>
            <Stack direction="row" spacing={7}>
                <Typography variant="h4" gutterBottom>
                    Welcome to <em>{userCollection.username}</em> collection
                </Typography>
                <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ width: '100' }}>
                    Cancel
                </Button>
                {isModified ?
                    <Button variant="contained" color="primary" onClick={handleMakeTrade} sx={{ width: '100' }}>
                        Start Trade
                    </Button> : <></>
                }
            </Stack>
            <br></br>
            <Typography variant="h6" gutterBottom>
                Select the cards you are interested in from <em>{userCollection.username}</em> collection by <strong>double-clicking</strong> the select cell.
            </Typography>
            <CollectionSelect
                cardsList={userCollection.collection}
                tradeCards={whatHeTrade}
                setTrade={setWhatHeTrade}
            />
        </div>
    );
}
