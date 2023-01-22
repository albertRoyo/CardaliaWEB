import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { PostLogin } from '../services/Services'
import { setUserData } from '../reducers/UserData.reducer'

import Avatar from '@mui/material/Avatar'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const theme = createTheme()

    const handleLogin = () => {
        PostLogin(username, password)
            .then((response) => {
                dispatch(setUserData({ username: username, email: response.data.email, token: response.data.token }))
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Logged in as ' + username,
                    showConfirmButton: false,
                    timer: 1500,
                    titleStyle: {
                        fontSize: '18px',
                        fontFamily: ''
                    }
                })
                //alert.success()
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Wrong username or password. Please, try again',
                    showConfirmButton: false,
                    timer: 1500
                })

                //alert.error('')
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
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
                            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ width: '100%' }}>
                                Login
                            </Button>
                            <br></br>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Create one"}
                            </Link>
                        </Box>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    )
}

