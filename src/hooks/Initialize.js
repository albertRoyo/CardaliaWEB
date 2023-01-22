import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setTrades } from '../reducers/TradeData.reducer'
import { setCardsList } from '../reducers/CardsList.reducer'
import { GetCollection, GetTrades } from '../services/Services'

function useInitialize() {
    const token = useSelector(state => state.userData.token)

    const dispatch = useDispatch()

    useEffect(() => {
        GetCollection(token)
            .then(response => {
                dispatch(setCardsList(response.data.collection))
                //console.log("Get coll: ", response.data.collection)
            })
            .catch(err => {
                console.log(err)
            })
        GetTrades(token)
            .then(response => {
                dispatch(setTrades(response.data.trades))
                console.log("Get trade: ", response.data.trades)
            })
            .catch(err => {
                console.log(err)
            })

    }, [dispatch, token])
}


export default useInitialize;