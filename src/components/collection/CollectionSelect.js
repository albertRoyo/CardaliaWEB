/*
Collection Select

This is a React functional component that allows the user to select a certain number of cards 
from a list of cards for a trade. The component uses the hooks useState and useEffect and receives
several props as input, including cardsList, tradeCards, setTrade, selection, and finished.

The component starts by defining the state variable cards and initializing it as an empty array. 
It then uses a for loop to iterate through the tradeCards prop and creates a new Map object called
tradesByCardId. It maps the id, extras, and condi of each card to its corresponding trade, so it 
can be easily accessed later on.

The component defines a handleRowEditCommit function that will be called when a user selects a 
certain number of cards for a trade. It takes in an object cellData as an input and uses it to update
the tradesByCardId map and the tradeCards state.

The component also defines a findCardInTrades function that will be used to check if a card is 
already present in the tradeCards state and to get the selection.

The component also defines an array of columns that will be used to render the list of cards in a 
tabular format. The columns include the Copies, Card name, Version, Extras, Condition, and Select columns. 
The Select column is only editable if finished is false and selection is true.

The useEffect hook is used to update the cards state variable with the data from cardsList whenever 
cardsList changes.

Finally, the component uses the renderCell property to create a button on the Card name column that 
opens a new window with the image of the card when clicked.
*/
import React, { useEffect, useState } from "react"
import clsx from 'clsx'


import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'


export function CollectionSelect({ cardsList, tradeCards, setTrade, selection, finished }) {
    const [cards, setCards] = useState([])

    const tradesByCardId = new Map()
    console.log("collection select: ", tradeCards)
    for (const trade of tradeCards) {
        const card = trade.card
        const cardId = `${card.id}-${card.extras}-${card.condi}`
        tradesByCardId.set(cardId, trade)
    }
    const handleRowEditCommit = (cellData) => {
        const { id, value } = cellData
        console.log(value)
        const card = cardsList[id]
        const cardId = `${card.id}-${card.extras}-${card.condi}`
        let trade = tradesByCardId.get(cardId)
        if (trade) {
            trade.select = value;
        } else {
            trade = {
                card,
                select: value,
            }
            tradesByCardId.set(cardId, trade);
        }
        const newTradeCards = Array.from(tradesByCardId.values())
        setTrade(newTradeCards)
    }
    function findCardInTrades(card) {
        for (const tradeCard of tradeCards) {
            if (tradeCard.card.id === card.version_id & tradeCard.card.extras === card.extras & tradeCard.card.condi === card.condi) {
                return tradeCard.select
            }
        }
        return 0
    }



    const columns = [
        {
            field: 'Copies',
            headerName: "",
            hideable: true,
            hide: finished,
            width: 50,
        },
        {
            field: 'name',
            headerName: "Card name",
            renderCell: (params) => {
                return (
                    <button href="#" onClick={(e) => {
                        const width = 260
                        const height = 360
                        const left = e.clientX - 30
                        const top = e.clientY - 110
                        window.open(params.row.img, '_blank', `resizable,height=${height},width=${width},top=${top},left=${left}`);
                    }} rel="noreferrer"
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'black',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textDecoration: 'underline',
                        }}>
                        {params.row.name}
                    </button>
                )
            },
            hideable: false,
            width: 150,
        },
        {
            field: 'version',
            headerName: "Version",
            width: 120
        },
        {
            field: 'extras',
            headerName: "Extras",
            width: 100
        },
        {
            field: 'condi',
            headerName: "Condition",
            width: 100
        },
        {
            field: 'select',
            headerName: "Select",
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            hideable: false,
            editable: (!finished && selection),
            cellClassName: (params) => {
                return clsx('super-app', {
                    selected: params.value > 0,
                });
            },
            type: 'singleSelect',
            valueOptions: ({ row }) => {
                const newValueOptions = []
                for (let i = 0; i <= row.Copies; i++) {
                    newValueOptions.push({ value: i, label: i })
                }
                return newValueOptions;
            },
            width: 60
        }
    ]
    useEffect(() => {
        const rows = []
        if (!finished) {
            for (let i = 0; i < cardsList.length; i += 1) {
                const row = {
                    id: i,
                    Copies: cardsList[i].count,
                    name: cardsList[i].name,
                    version: cardsList[i].set_name,
                    extras: cardsList[i].extras,
                    condi: cardsList[i].condi,
                    select: findCardInTrades(cardsList[i]),
                    img: cardsList[i].image_uris.large
                }
                rows.push(row)
            }
        }
        else {
            for (let i = 0; i < tradeCards.length; i += 1) {
                const row = {
                    id: i,
                    name: tradeCards[i].card.name,
                    version: tradeCards[i].card.set_name,
                    extras: tradeCards[i].card.extras,
                    condi: tradeCards[i].card.condi,
                    select: tradeCards[i].select,
                    img: tradeCards[i].card.image_uris.large
                }
                rows.push(row)
            }
        }
        setCards(rows)
        // eslint-disable-next-line
    }, [cardsList])


    return (
        <div>
            <Box
                sx={{
                    height: 300,
                    width: finished ? '532px' : '582px',
                    '& .super-app-theme--header': {
                        backgroundColor: "#B8D3FF",
                    },
                    '& .super-app.selected': {
                        backgroundColor: '#dbe9ff',

                    },
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={cards}
                    autoHeight
                    onCellEditCommit={handleRowEditCommit}
                    disableSelectionOnClick

                />
                <br></br>

            </Box>

        </div>

    );
}
