import { useState } from 'react'
import './login.css';
import { Button, Stack, TextField, Paper, Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';


function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    return (
        <center>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 300,
                        height: 370,
                    },
                }}
            >
                <Paper elevation={20}>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h5"> Admin Login </Typography>
                        <Box sx={{ m: 2 }} />
                        <TextField id="outlined-basic" label="Username" variant="outlined" />
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Remember Me" />
                        </FormGroup>
                        <Button size="large">Login</Button>
                    </Stack>
                </Paper>
            </Box>
        </center>
    )
}

export default AdminLogin
