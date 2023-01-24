/*
User Collections List

This is a React functional component that renders a list of user collections based on 
the userCollections prop passed to it. The component returns JSX element that uses the 
List and ListItem components from Material-UI to create an unordered list of user collections.

It starts by checking if the length of the userCollections prop is not equal to 0, if 
true it maps through the userCollections prop and creates a ListItem for each user collection. 
Each ListItem contains a link to the new trade page and passes the userCollection data as state to the link.

If the userCollections prop is empty, it renders a message saying that no user was found owning 
the searched card.
*/

import React from 'react'
import { Link } from "react-router-dom"

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

export const UserCollectionsList = ({ userCollections }) => {

    return (
        <>
            <Tooltip title="Click a user to see his collection" >
                {userCollections.length !== 0 ?
                    <List sx={{ marginLeft: "40px" }}>
                        {userCollections.map((userCollection) => (
                            <ListItem key={userCollection.username}>
                                <Link to="/newtrade" state={userCollection}>
                                    <em>{userCollection.username}</em>
                                </Link>
                            </ListItem>
                        ))}
                    </List> :
                    <>
                        <br></br>
                        <Typography variant="body1" sx={{ marginLeft: "40px" }} gutterBottom>
                            <em>Not user found owning the searched card</em>
                        </Typography>
                    </>
                }
            </Tooltip>
        </>
    )
}