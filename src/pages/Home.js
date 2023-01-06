import React, { useState } from 'react'
import { useSelector } from 'react-redux'

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

  const cardSearchHandler = (card) => {
    setCardSearch(card)
    GetUsersCollectionsWithCard(card.oracle_id, token)
      .then(response => {
        setUserCollections(response.data.user_collections)
        setIsCardSeted(true)
      })
      .catch(err => {
        console.log(err)
      })
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
            Get what you want for what you got!
          </Typography>
          <br></br>
          <Typography variant="body1" gutterBottom>
            Start by <strong>adding</strong> cards you have but don't need to <strong>your collection</strong>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The more value the cards you add have, the easier it will be for you to get the cards you want.
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
