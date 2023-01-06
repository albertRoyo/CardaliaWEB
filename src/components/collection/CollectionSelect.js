import React, { useEffect, useState } from "react"
import clsx from 'clsx'

import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'


export function CollectionSelect({ cardsList, tradeCards, setTrade, finished }) {
    const [cards, setCards] = useState([])

    const tradesByCardId = new Map()

    for (const trade of tradeCards) {
        const card = trade.card;
        const cardId = `${card.version_id}-${card.extras}-${card.condi}`;
        tradesByCardId.set(cardId, trade);
    }

    const handleRowEditCommit = (cellData) => {
        const { id, value } = cellData
        console.log(value)
        const card = cardsList[id]
        const cardId = `${card.version_id}-${card.extras}-${card.condi}`
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
            if (tradeCard.card.version_id === card.version_id & tradeCard.card.extras === card.extras & tradeCard.card.condi === card.condi) {
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
            editable: !finished,
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
                    select: findCardInTrades(cardsList[i])
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
                    select: tradeCards[i].select
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
