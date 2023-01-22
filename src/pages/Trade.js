import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import isEqual from 'lodash/isEqual'

import { GetUsersCollection } from '../services/Services'
import { ModifyTrade, GetTrades, DeleteTrade } from "../services/Services"
import { setTrades } from '../reducers/TradeData.reducer'

import { CollectionSelect } from '../components/collection/CollectionSelect'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FormControlLabel from '@mui/material/FormControlLabel'

export function Trade() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const token = useSelector(state => state.userData.token)
    const trade = location.state
    const initialTrade = { ...trade } //useRef(trade);
    //const [currentTrade, setCurrentTrade] = useState(trade)
    //const initialTrade = { ...trade }
    const [whatHeTrade, setWhatHeTrade] = useState(trade.whatHeTrade)
    const [whatYouTrade, setWhatYouTrade] = useState(trade.whatYouTrade)
    const [traderCollection, setTraderCollection] = useState([])

    const finished = trade.heChecked & trade.youChecked

    const yourCollection = useSelector(state => state.cardsList.list)

    const [youChecked, setYouChecked] = useState(trade.youChecked)
    const heChecked = trade.heChecked

    const handleUpdateTrade = () => {
        ModifyTrade(trade, token)
            .then(() => {
                GetTrades(token)
                    .then(response => {
                        dispatch(setTrades(response.data.trades))
                        if (youChecked & heChecked) {
                            navigate("/trades")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                alert.success('Trade updated succesfully')
            })
            .catch(err => {
                alert.error('A problem ocurred. Please, retry')
                console.log(err)
            })
    }

    const handleFinishTrade = (event) => {
        setYouChecked(event.target.checked)
    }

    const handleCancelTrade = () => {
        DeleteTrade(token, trade.username)
            .then(() => {
                GetTrades(token)
                    .then(response => {
                        dispatch(setTrades(response.data.trades))
                    })
                    .catch(err => {
                        console.log(err)
                    })

                navigate("/trades")
            })
            .catch(err => {
                alert.error('A problem ocurred. Please, retry')
                console.log(err)
            })
    }

    useEffect(() => {
        if (!finished) {
            GetUsersCollection(trade.username)
                .then(response => {
                    setTraderCollection(response.data.user_collection)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        trade.whatHeTrade = whatHeTrade
        trade.whatYouTrade = whatYouTrade
        trade.youChecked = youChecked
        if (!isEqual(trade, initialTrade)) {
            alert.info('Untracked changes. Please, update trade')
        }
        // eslint-disable-next-line
    }, [whatHeTrade, whatYouTrade, youChecked])

    return (
        <div>
            <br></br>
            {!finished ?
                <Stack direction="row" spacing={113.5}>
                    <Button variant="contained" color="primary" onClick={handleUpdateTrade} sx={{ width: '100' }}>
                        Update Trade
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleCancelTrade} sx={{ width: '70' }} endIcon={<DeleteIcon />}>
                        Cancel trade
                    </Button>
                </Stack> :
                <>
                    <Typography variant="h4" gutterBottom>
                        Finished trade
                    </Typography>
                    <Stack direction="row" spacing={113.5}>
                        <Typography variant="body1" gutterBottom>
                            Contact <em>{trade.username}</em> via email to meet and trade the cards selected.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Email: <em>{trade.email}</em>
                        </Typography>
                    </Stack>
                </>
            }
            <br></br>
            <Stack direction="row" spacing={7}>
                <div>
                    <Stack direction="row" spacing={38}>
                        <Typography variant="h6" gutterBottom>
                            What you trade
                        </Typography>
                        {(!finished && (whatYouTrade.length !== 0 && whatHeTrade.length !== 0)) ?
                            <Tooltip title="Mark this trade as finished on your side">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={youChecked} onChange={handleFinishTrade} name="you_finished" />
                                    }
                                    label="Finished trade"
                                />
                            </Tooltip> :
                            <></>
                        }
                    </Stack>
                    <CollectionSelect
                        cardsList={yourCollection}
                        tradeCards={whatYouTrade}
                        setTrade={setWhatYouTrade}
                        finished={finished}
                    />
                </div>
                <div>
                    <Stack direction="row" spacing={30}>
                        <Typography variant="h6" gutterBottom>
                            What <em>{trade.username}</em> trades
                        </Typography>
                        {!finished ?
                            <FormControlLabel
                                control={
                                    <Checkbox checked={heChecked} name="he_finished" />
                                }
                                disabled
                                label="Finished trade"
                            /> :
                            <></>
                        }
                    </Stack>
                    <CollectionSelect
                        cardsList={traderCollection}
                        tradeCards={whatHeTrade}
                        setTrade={setWhatHeTrade}
                        finished={finished}
                    />
                </div>
            </Stack>
        </div>
    )
}