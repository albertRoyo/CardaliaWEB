import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import { PostCollection } from "../services/Services"
import { addCard } from "../reducers/CardsList.reducer"

import { CollectionEdit } from '../components/collection/CollectionEdit'
import { SearchBar } from '../components/search/SearchBar'
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography'


export function Collection() {

    const cardsList = useSelector(state => state.cardsList.list)
    const token = useSelector(state => state.userData.token)
    const dispatch = useDispatch();
    const alert = useAlert()

    const [isModified, setIsModified] = useState(false)

    const cardSearchHandler = (card) => {
        setIsModified(true)
        dispatch(addCard(card))
    }

    const handleSaveCollection = () => {
        PostCollection(cardsList, token)
            .then(() => {
                alert.success('Collection updated succesfully')
                setIsModified(false)
            })
            .catch(err => {
                alert.error('A problem ocurred. Please, retry')
                console.log(err)
            })
    }

    return (
        <div>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Collection
            </Typography>
            <SearchBar cardSearchHandler={cardSearchHandler} setIsModified={setIsModified} />
            <Stack direction="row" spacing={79}>
                <Typography variant="h6" gutterBottom>
                    Your Collection
                </Typography>
                {isModified ?
                    <Button variant="contained" color="primary" onClick={handleSaveCollection} sx={{ width: '100' }}>
                        Save collection
                    </Button> : <></>
                }
            </Stack>
            <CollectionEdit
                cardsList={cardsList}
                isModified={isModified}
                setIsModified={setIsModified}
            />
        </div>
    );
}
