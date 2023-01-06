import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { PostCollection } from "../services/Services"
import { addCard } from "../reducers/CardsList.reducer"

import { CollectionCardList } from '../components/collection/CollectionCardList'
import { SearchBar } from '../components/search/SearchBar'
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography'


export function Collection() {

    const cardsList = useSelector(state => state.cardsList.list)
    const token = useSelector(state => state.userData.token)
    const dispatch = useDispatch();


    const cardSearchHandler = (card) => {
        dispatch(addCard(card))
    }

    const handleSaveCollection = () => {
        PostCollection(cardsList, token)
    }

    return (
        <div>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Collection
            </Typography>
            <SearchBar cardSearchHandler={cardSearchHandler} />
            <Stack direction="row" spacing={79}>
                <Typography variant="h6" gutterBottom>
                    Your Collection
                </Typography>
                <Button variant="contained" color="primary" onClick={handleSaveCollection} sx={{ width: '100' }}>
                    Save collection
                </Button>
            </Stack>
            <CollectionCardList
                cardsList={cardsList}
            />
        </div>
    );
}
