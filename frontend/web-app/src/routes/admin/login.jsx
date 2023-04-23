import { useState } from 'react'
import classes from './login.module.css'
import axios from 'axios'
import { Button, Stack, TextField, Paper, Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';


function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleRememberMe = e => setRememberMe(e.target.checked);

    const handleLogin = () => {
        const user = {
            username: username,
            password: password
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/admin/login',
            headers: {},
            data: user
        };

        axios.request(config)
            .then((response) => {
                localStorage.setItem('accessToken', response.data['accessToken'])
                localStorage.setItem('refreshToken', response.data['refreshToken'])
                localStorage.setItem('rememberMe', rememberMe)
                console.log('Logged In');
            })
            .catch((error) => {
                console.log(error);
            });

    }

    document.body.className = classes.bg
    return (
        <>
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
                            <TextField value={username} id="outlined-basic" label="Username" variant="outlined" onChange={handleUsername} />
                            <TextField value={password} id="outlined-basic" label="Password" type="password" variant="outlined" onChange={handlePassword} />
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleRememberMe} />} label="Remember Me" />
                            </FormGroup>
                            <Button size="large" onClick={handleLogin}>Login</Button>
                        </Stack>
                    </Paper>
                </Box>
            </center>
        </>
    )
}

export default AdminLogin
