import React, { useEffect, useState } from "react"

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
                        alert.error('A problem ocurred. Please, retry')
                        console.log(err)
                        return
                    })
            }, 500)
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
