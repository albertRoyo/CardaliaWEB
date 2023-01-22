import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { ChangeUserPassword } from '../services/Services'

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function UserProfile() {

    const [isChangePassword, setIsChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const token = useSelector(state => state.userData.token)
    const email = useSelector(state => state.userData.email)

    const handlePasswordChange = () => {

        // Validate the new password and confirm password
        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                title: 'The passwords do not match',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        // Update the user's password
        ChangeUserPassword(oldPassword, newPassword, token)
            .then(() => {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Password updated succesfully',
                    showConfirmButton: false,
                    timer: 1500
                })
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

        setIsChangePassword(false)
    }

    useEffect(() => {
        if (!isChangePassword) {
            setOldPassword("")
            setNewPassword("")
            setConfirmNewPassword("")
        }
    }, [isChangePassword])

    return (
        <div>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Your profile
            </Typography>
            <br></br>
            <Typography variant="h6" gutterBottom>
                Your email: <em>{email}</em>
            </Typography>
            <br></br>
            {!isChangePassword ?
                <Button variant="contained" color="primary" onClick={e => setIsChangePassword(true)} >
                    Change password
                </Button> :
                <>
                    <Box component="form" noValidate
                        sx={{
                            marginTop: 2,
                            marginLeft: 4,
                            width: 220,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom>
                            Change your password
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="oldPassword"
                            label="Old password"
                            name="oldPassword"
                            type="password"
                            autoFocus
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="newPassword"
                            label="New password"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="confirmNewPassword"
                            label="Confirm new password"
                            name="confirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                        />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Button variant="contained" color="primary" onClick={handlePasswordChange} sx={{ width: '100%' }}>
                                Change password
                            </Button>
                            <br></br>
                            <Button variant="outlined" color="error" onClick={e => setIsChangePassword(false)} sx={{ width: '100%' }}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </>
            }
        </div>
    );
}