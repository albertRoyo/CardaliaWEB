import React, { useState } from 'react'

import Typography from '@mui/material/Typography'

export function UserProfile() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handlePasswordChange(event) {
        event.preventDefault()

        // Validate the new password and confirm password
        if (password !== confirmPassword) {
            alert('The passwords do not match')
            return;
        }

        // Update the user's password
        //updatePassword(password)
    }

    return (
        <div>
            <br></br>
            <Typography variant="h4" gutterBottom>
                Your profile
            </Typography>
            <br></br>
            <br></br>
            <Typography variant="h6" gutterBottom>
                Reset your password:
            </Typography>
            <form onSubmit={handlePasswordChange}>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <br />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}