/*
Start trade view

This is a functional component called StartTrade that is responsible for starting a new trade with 
another user. The component uses the useLocation hook access the state passed from the previous route. 
It also uses the useDispatch and useSelector hooks from the to interact with the global state and the 
useNavigate hook to navigate to different routes in the app.

The component uses the useState hook to keep track of the selected cards by the user that he wants to 
trade, and a boolean value that indicates if the user has made any selections.

The handleMakeTrade function is called when the user clicks the "Start Trade" button. It makes a POST 
request to the server with the selected cards and the trade's username as the body of the request. 
If the trade is successful, it shows an alert with a success message, it updates the trades list 
in the global state and navigates the user to the trades page. If the trade is unsuccessful, it shows 
a alert with an error message and logs the error message in the browser's console.

The handleCancel function is called when the user clicks the "Cancel" button and it navigates the user 
back to the home page.

The component also includes a message that welcomes the user to the other user's collection and ask him 
to select the cards he wants to trade by double-clicking the selected cell. It also includes a "Cancel" 
button that when clicked, triggers the handleCancel function and a "Start Trade" button that when clicked, 
triggers the handleMakeTrade function, but it is only enabled if the user has made any selections.
*/

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
                selection={true}
            />
        </div>
    );
}
