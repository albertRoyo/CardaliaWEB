/*
App Bar

The code is an implementation of a custom AppBar component in React. It uses the Material-UI 
AppBar component to create a top navigation bar. It has 3 main features, the Home button, the 
Collection button and the Trades button. These buttons allow the user to navigate to the home 
page, their collection page and their trades page, respectively. The user's username is also 
displayed on the right side of the AppBar, and when clicked, it opens a menu with options for 
the user's profile and logout.

The component also uses the useSelector and useDispatch hooks from the react-redux library to 
access the user's username from the global state and to dispatch the resetUserData action which 
is used when the user logs out.

The component also uses the useNavigate hook from the react-router library to navigate to different 
pages in the application.

The component uses the Material-UI's Toolbar and Container components to create a responsive 
layout, and the Tooltip component to give the user a hint when hover over the buttons and username.
*/

import * as React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { resetUserData } from '../reducers/UserData.reducer'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

const settings = ['Profile', 'Logout']

export function AppBarCustom() {
  //const [anchorElNav, setAnchorElNav] = React.useState(null)

  const username = useSelector(state => state.userData.username)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleChoseMenu = (event, menuSetting) => {
    setAnchorElUser(null)
    if (menuSetting === 'Logout') {
      dispatch(resetUserData())
      navigate("/")
    }
    else navigate("/profile")

  }

  const handleCollection = () => {
    navigate("/collection")
  }

  const handleTrades = () => {
    navigate("/trades")
  }

  const handleHome = () => {
    navigate("/")
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Home page">
            <Typography
              variant="h6"
              noWrap
              component="a"
              style={{ cursor: 'pointer' }}
              onClick={handleHome}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CARDALIA
            </Typography>
          </Tooltip>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Your collection">
              <Button
                onClick={handleCollection}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Your Collection
              </Button>
            </Tooltip>
            <Tooltip title="Your trades">
              <Button
                onClick={handleTrades}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Your Trades
              </Button>
            </Tooltip>
            <Box sx={{ flexGrow: 0, ml: 'auto' }}>
              <Tooltip title="Open settings">
                <Button onClick={handleOpenUserMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {username} ▼
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(event) => handleChoseMenu(event, setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
