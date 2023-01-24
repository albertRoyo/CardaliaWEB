/*
Home view

The Home function is a functional component that renders the homepage of the CARDALIA website. 
It uses React hooks to manage the state of the component and also uses the useSelector hook from 
the react-redux library to access the token from the global state. The component has two states, 
cardSearch and isCardSeted that control the render of the component depending on whether a card has 
been searched or not.

The component has a cardSearchHandler function that is passed as a prop to the SearchBar component. 
This function is called when a user selects a card from the search results. The function makes a request 
to the server to get the collections of all users that own the selected card and sets the state userCollections
with the received data. This function also sets the state isCardSeted to true so the component knows to
render the list of users with the selected card.

The component also has a handleResetCardSearch function that is used to reset the cardSearch and 
isCardSeted states when the user wants to start a new search.

The component's JSX renders the homepage with different elements depending on whether a card has been 
searched or not. If a card has been searched, it renders a list of users that own the card, along with a 
button to reset the search. If no card has been searched, it renders a welcome message and instructions for
the user on how to use the website.
*/

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { GetUsersCollectionsWithCard } from '../services/Services'

import { SearchBar } from '../components/search/SearchBar'
import { UserCollectionsList } from '../components/user/UserCollectionsList'
import Typography from '@mui/material/Typography'
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete'

export function Home() {
  const [cardSearch, setCardSearch] = useState({})
  const [isCardSeted, setIsCardSeted] = useState(false)
  const [userCollections, setUserCollections] = useState([])
  const token = useSelector(state => state.userData.token)
  const collection = useSelector(state => state.cardsList.list)


  const cardSearchHandler = (card) => {
    if (collection.length === 0) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'info',
        title: 'Please, add card to your collection before starting a trade.',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      setCardSearch(card)
      GetUsersCollectionsWithCard(card.oracle_id, token)
        .then(response => {
          setUserCollections(response.data.user_collections)
          setIsCardSeted(true)
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
  }

  const handleResetCardSearch = () => {
    setCardSearch({})
    setIsCardSeted(false)
  }

  return (
    <div>
      <br></br>
      {isCardSeted ?
        <>
          <Stack direction="row" spacing={3}>
            <Typography variant="h6" gutterBottom>
              Users with the card
            </Typography>
            <Button variant="outlined" onClick={handleResetCardSearch} sx={{ width: '70' }} endIcon={<DeleteIcon />}>
              {cardSearch.name}
            </Button>
            <></>
          </Stack>
          <UserCollectionsList userCollections={userCollections} />
        </>
        :
        <>
          <Typography variant="h4" gutterBottom>
            Welcome to CARDALIA
          </Typography>
          <Typography variant="h6" gutterBottom>
            Your Magic: The Gathering card trade website
          </Typography>
          <br></br>
          <Typography variant="body1" gutterBottom>
            Start by <strong>adding</strong> cards you have but don't need to <strong>your collection</strong>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Search</strong> for a card and visit another user's collection to <strong>start the trade</strong>.
          </Typography>
          <br></br>

          <SearchBar cardSearchHandler={cardSearchHandler} />

        </>
      }
    </div>
  );
}
