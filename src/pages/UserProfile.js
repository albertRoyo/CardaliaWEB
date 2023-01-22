import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { ChangeUserPassword } from '../services/Services'

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function UserProfile() {
    const alert = useAlert()

    const [isChangePassword, setIsChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const token = useSelector(state => state.userData.token)
    const email = useSelector(state => state.userData.email)

    const handlePasswordChange = () => {

        // Validate the new password and confirm password
        if (newPassword !== confirmNewPassword) {
            alert('The passwords do not match')
            return
        }

        // Update the user's password
        ChangeUserPassword(oldPassword, newPassword, token)
            .then(() => {
                alert.success('Collection updated succesfully')
            })
            .catch(err => {
                alert.error('A problem ocurred. Please, retry')
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
            <br></br>
            <Typography variant="h6" gutterBottom>
                Your email: <em>{email}</em>
            </Typography>
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
                            autoComplete="oldPassword"
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
                            autoComplete="newPassword"
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
                            autoComplete="confirmNewPassword"
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