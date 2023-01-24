/*
This is a React functional component that creates a search bar that allows the user to search for a 
specific card by name. The component uses the hooks useState and useEffect and receives one prop as 
input: cardSearchHandler.

The component starts by defining two state variables: searchQuery and data. searchQuery is used to 
store the current value of the search bar and data is used to store the results of the search.

The component also defines a add function which is passed the selected card and passed it to the 
cardSearchHandler prop.

The component uses the useEffect hook to monitor changes to the searchQuery state variable. If the 
length of searchQuery is greater than 2 characters, the component uses the GetData function to fetch
data from an external API, passing the searchQuery as a parameter. The data is then stored in the data 
state variable.

The component then uses the TextField component to create the search bar and it binds the value of the 
search bar to the searchQuery state variable.

Then, the component maps through the data state and creates a horizontal list of images of the cards 
returned by the search. Each image is bound to the add function that adds the selected card to the 
cardSearchHandler prop.

Finally, the component returns a JSX element that contains the search bar and the horizontal list of 
images. The JSX element is rendered on the page, allowing the user to interact with the search bar and 
view the results of the search.

It's important to note that the component uses the GetData function to get the cards data from an external 
source and uses an alert message in case of a problem with the API call.

Additionally, it makes use of the setTimeout function to delay the API call by 700ms, which is useful to 
avoid unnecessary calls or to debounce the search, it also uses the clearTimeout function to clear the previous 
setTimeout call when the user types a new search query before the previous call has finished.
*/


import React, { useEffect, useState } from "react"
import Swal from 'sweetalert2'


import { GetData } from "../../services/Services"

import TextField from "@mui/material/TextField"


export function SearchBar({ cardSearchHandler }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [data, setData] = useState([])

    const add = (card) => {
        cardSearchHandler(card)
    }

    useEffect(() => {
        if (searchQuery.length > 2) {
            const timer = setTimeout(() => {
                GetData(searchQuery)
                    .then(response => {
                        setData(response.data)
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
                        return
                    })
            }, 700)
            return () => clearTimeout(timer)
        }
        else {
            setData([])
        }
    }, [searchQuery])

    const horizontalList = {
        display: 'flex',
        flexDirection: 'row',
        padding: 3,
    }

    return (
        <div>
            <div>
                <TextField
                    value={searchQuery}
                    label="Enter a card name"
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                />
            </div>
            <div>
                <ul style={horizontalList}>
                    {data.map((card, index) => (
                        <li key={index}>
                            <img
                                alt={card.name}
                                src={card.image_uris.small}
                                onClick={() => add(card)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );


}
