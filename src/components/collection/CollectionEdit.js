/*
Collection Edit

This is a React functional component that allows the user to edit a collection of cards. 
The component uses the hooks useState and useEffect and makes use of the useDispatch hook 
from the react-redux library to dispatch actions to the store.

The component starts by defining the state variables that will be used throughout the component, 
including cards, modID, modExtras, modCondition, modVersion, isModify, isModVersion, isModExtras, 
isModCondition, and cardVersions. It also receives two props cardsList and isModified and a function 
setIsModified as input.

The component defines several functions to handle the different actions that can be performed on the 
collection, such as increasing or decreasing the number of copies of a card, modifying the card's version, 
condition, or extras, and saving the modifications made to a card.

The component also defines several event handlers that will be used to handle changes to the modVersion, 
modExtras, and modCondition state variables.

The useEffect hook is used to track changes to the state variables isModVersion, isModExtras, and 
isModCondition and to update the isModified state variable accordingly.

Finally, the component defines an array of columns, including the Copies, Name, Version, Extras, and 
Condition columns, that will be used to render the collection of cards in a tabular format.
*/


import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { GetVersions } from "../../services/Services"
import { incCard, decCard, modVersionCard, modExtrasCard, modConditionCard } from '../../reducers/CardsList.reducer'

import { DataGrid } from '@mui/x-data-grid'
import Icon from '@mui/material/Icon'
import Chip from '@mui/material/Chip'
import Stack from "@mui/material/Stack"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"



export function CollectionEdit({ cardsList, isModified, setIsModified }) {
    const [cards, setCards] = useState([])

    const [modID, setModID] = useState("")
    const [modExtras, setModExtras] = useState("")
    const [modCondition, setModCondition] = useState("")
    const [modVersion, setModVersion] = useState("")

    const [isModify, setIsModify] = useState(false)
    const [isModVersion, setIsModVersion] = useState(false)
    const [isModExtras, setIsModExtras] = useState(false)
    const [isModCondition, setIsModCondition] = useState(false)

    const [cardVersions, setCardVersions] = useState([])

    const dispatch = useDispatch()

    const handleIncCard = (id) => {
        dispatch(incCard(id))
        setIsModified(true)
    }

    const handleDecCard = (id) => {
        dispatch(decCard(id))
        setIsModified(true)
    }

    const handleModCard = (row) => {
        GetVersions(row.name, setCardVersions, setIsModify)
            .then((response) => {
                setCardVersions(response.data)
                setModVersion(row.version)
                setIsModify(true)
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
        setModID(row.id)
        setModExtras(row.extras)
        setModCondition(row.condi)
    }

    const handleSaveCard = (row) => {
        if (isModVersion) {
            let cardVersion = {
                id: row.id,
                newId: modVersion.id,
                set_name: modVersion.set_name,
                set: modVersion.set,
                collector_number: modVersion.collector_number,
                img: modVersion.image_uris.large,

            }
            dispatch(modVersionCard(cardVersion))
            setIsModVersion(false)
        }
        if (isModExtras) {
            let cardExtras = {
                id: row.id,
                extras: modExtras
            }
            dispatch(modExtrasCard(cardExtras))
            setIsModExtras(false)
        }
        if (isModCondition) {
            let cardCondition = {
                id: row.id,
                condi: modCondition
            }
            dispatch(modConditionCard(cardCondition))
            setIsModCondition(false)
        }
        setIsModify(false)
        if (isModified) {
            //alert.info('Untracked changes. Please, save collection')
        }
    }

    const handleChangeVersion = (event) => {
        setModVersion(event.target.value)
        setIsModVersion(true)
    }

    const handleChangeExtra = (event) => {
        setModExtras(event.target.value)
        setIsModExtras(true)
    }

    const handleChangeCondition = (event) => {
        setModCondition(event.target.value)
        setIsModCondition(true)
    }

    useEffect(() => {
        if (isModVersion || isModExtras || isModCondition) {
            setIsModified(true)
        }
    }, [isModVersion, isModExtras, isModCondition, setIsModified])

    const columns = [
        {
            field: 'Copies',
            headerName: "",
            hideable: false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={0}>
                        <Chip label={params.row.Copies} size="small" variant="outlined" />
                        <Icon onClick={() => { handleIncCard(params.id) }} style={{ marginLeft: 5 }}>add</Icon>
                        <Icon onClick={() => { handleDecCard(params.id) }}>remove</Icon>
                    </Stack>
                );
            },
            width: 100,
        },
        {
            field: 'name',
            headerName: "Card name",
            hideable: false,
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
            width: 250,
        },
        {
            field: 'version',
            headerName: "Version",
            renderCell: (params) => {
                return (
                    <div>
                        {modID === params.id && isModify && cardVersions.length > 1 ?
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modVersion}
                                label="Version"
                                onChange={handleChangeVersion}
                            >
                                {cardVersions.map((version) => {
                                    return (
                                        <MenuItem key={version.id} value={version}>
                                            {version.set_name + " nº" + version.collector_number}
                                        </MenuItem>
                                    )
                                })}
                            </Select> :
                            params.row.version
                        }
                    </div>

                );
            },
            width: 250
        },
        {
            field: 'extras',
            headerName: "Extras",
            renderCell: (params) => {
                return (
                    <div>
                        {modID === params.id && isModify ?
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modExtras}
                                label="Extras"
                                onChange={handleChangeExtra}
                            >
                                <MenuItem value={"Non Foil"}>Non Foil</MenuItem>
                                <MenuItem value={"Foil"}>Foil</MenuItem>
                                <MenuItem value={"Promo"}>Promo</MenuItem>
                                <MenuItem value={"Foil Etged"}>Foil Etged</MenuItem>
                            </Select> :
                            params.row.extras
                        }
                    </div>

                );
            },
            width: 100
        },
        {
            field: 'condi',
            headerName: "Condition",
            renderCell: (params) => {
                return (
                    <div>
                        {modID === params.id && isModify ?
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modCondition}
                                label="Versions"
                                onChange={handleChangeCondition}
                            >
                                <MenuItem value={"Mint"}>Mint</MenuItem>
                                <MenuItem value={"Near Mint"}>Near Mint</MenuItem>
                                <MenuItem value={"Excellent"}>Excellent</MenuItem>
                                <MenuItem value={"Good"}>Good</MenuItem>
                                <MenuItem value={"Light Played"}>Light Played</MenuItem>
                                <MenuItem value={"Played"}>Played</MenuItem>
                                <MenuItem value={"Poor"}>Poor</MenuItem>
                            </Select> :
                            params.row.condi
                        }
                    </div>
                );
            },
            width: 150
        },
        {
            field: 'Actions',
            headerName: "",
            sortable: false,
            hideable: false,
            renderCell: (params) => {
                return (
                    <div>
                        {modID === params.id && isModify ?
                            <Icon onClick={() => { handleSaveCard(params.row) }}>save</Icon> :
                            <Icon onClick={() => { handleModCard(params.row) }}>mode</Icon>
                        }
                    </div>
                );
            },
            width: 80
        }

    ]

    useEffect(() => {
        const rows = []

        for (let i = 0; i < cardsList.length; i += 1) {
            const row = {
                id: i,
                Copies: cardsList[i].count,
                name: cardsList[i].name,
                img: cardsList[i].image_uris.large,
                version: cardsList[i].set_name + " nº" + cardsList[i].collector_number,
                extras: cardsList[i].extras,
                condi: cardsList[i].condi,
                set: cardsList[i].set,
                collector_number: cardsList[i].collector_number,
                version_id: cardsList[i].version_id,
                oracle_id: cardsList[i].oracle_id
            }
            rows.push(row)
        }
        setCards(rows)
    }, [cardsList])


    return (
        <div>
            <div style={{ width: '935px' }}>
                <DataGrid
                    columns={columns}
                    rows={cards}
                    autoHeight
                    disableSelectionOnClick
                />
            </div>

        </div>

    );
}
