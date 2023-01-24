/*
Use Initialize

The useInitialize hook is used to initialize data from the server. It uses the useSelector 
hook to get the user's token from the Redux store, and the useDispatch hook to dispatch actions 
to update the store with the data received from the server.

The hook uses the useEffect hook to run a side-effect when the component that uses this hook 
is first rendered. The side-effect uses the GetCollection and GetTrades functions to make API 
calls to the server, passing the token as a parameter. The response data is then dispatched to 
the store using setCardsList and setTrades actions respectively.

This hook is designed to be used by a component that needs to fetch data from the server when 
it is first rendered and update the store with that data.
*/

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
            })
            .catch(err => {
                console.log(err)
            })
        GetTrades(token)
            .then(response => {
                dispatch(setTrades(response.data.trades))
            })
            .catch(err => {
                console.log(err)
            })

    }, [dispatch, token])
}


export default useInitialize