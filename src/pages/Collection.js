/*
Collection view

This is a functional component that represents a page for a user to manage their collection 
of cards. The component uses the hooks useSelector and useDispatch to access the global state 
and update it, respectively. The component also uses a custom hook called useInitialize() to 
fetch the user's collection and trades when the component mounts.

The component renders a SearchBar component that allows the user to search for cards to add to 
their collection.
It also includes a save button that allows the user to save any changes made to their collection.
It also includes a CollectionEdit component that displays the user's current collection and allows 
them to make changes to it.

It also displey alerts to inform the actions made by the user.
*/

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

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
    const dispatch = useDispatch()

    const [isModified, setIsModified] = useState(false)

    const cardSearchHandler = (card) => {
        setIsModified(true)
        dispatch(addCard(card))
    }

    const handleSaveCollection = () => {
        PostCollection(cardsList, token)
            .then(() => {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Collection updated succesfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                //alert.success('Collection updated succesfully')
                setIsModified(false)
            })
            .catch(err => {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'A problem ocurred. Please, retry',
                    showConfirmButton: false,
                    timer: 1500
                })
                //alert.error('A problem ocurred. Please, retry')
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
            <Stack direction="row" spacing={12}>
                <Typography variant="h6" gutterBottom>
                    Your Collection
                </Typography>
                {isModified ?
                    <>
                        <div></div><div></div><div></div>
                        <Typography variant="body1" gutterBottom>
                            <em>Save list rows before</em>
                        </Typography>

                        <Button variant="contained" color="primary" onClick={handleSaveCollection} sx={{ width: '100' }}>
                            Save collection
                        </Button>
                    </> : <></>

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
