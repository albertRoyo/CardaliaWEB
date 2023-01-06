import * as React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { setTrades } from '../reducers/TradeList.reducer'
import { setUserName, setUserToken } from '../reducers/UserData.reducer'
import { GetTrades } from '../services/Services'

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
  const token = useSelector(state => state.userData.token)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  /*const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleChoseMenu = (event, menuSetting) => {
    setAnchorElUser(null)
    if (menuSetting === 'Logout') {
      dispatch(setUserName(""))
      dispatch(setUserToken(""))
      navigate("/")
    }
    else navigate("/profile")

  }

  const handleCollection = () => {
    GetCollection(token)
      .then(response => {
        dispatch(setCardsList(response.data.collection))
        console.log("Get coll: ", response.data.collection)
        navigate("/collection")

      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleTrades = () => {
    GetTrades(token)
      .then(response => {
        dispatch(setTrades(response.data.trades))
        console.log("Get trade: ", response.data.trades)
        navigate("/trades")

      })
      .catch(err => {
        console.log(err)
      })
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
