import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { PostRegister } from '../services/Services'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'


export function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const theme = createTheme()

    const handleRegister = () => {
        PostRegister(username, password)
            .then(() => {
                //alert.success('Registration successfull. Log in')
                navigate("/")
            })
            .catch(err => {
                //alert.error('Username taken')
                console.log(err)
                return
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create an account
                    </Typography>
                    <Box component="form" noValidate
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Button variant="contained" color="primary" onClick={handleRegister} sx={{ width: '100%' }}>
                                Register
                            </Button>
                            <br></br>
                            <Link href="/" variant="body2">
                                {"Already have an account? Log in"}
                            </Link>
                        </Box>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    )
}