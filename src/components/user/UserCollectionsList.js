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
                            Not user found owning the searched card
                        </Typography>
                    </>
                }
            </Tooltip>
        </>
    )
}