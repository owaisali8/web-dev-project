import { useState, useEffect } from 'react'
import classes from './login.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { Button, Stack, TextField, Paper, Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { Alert } from '@mui/material';


function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState([false, ''])
    const navigate = useNavigate()

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
                if (rememberMe) {
                    localStorage.setItem('username', username)
                    localStorage.setItem('accessToken', response.data['accessToken'])
                    localStorage.setItem('refreshToken', response.data['refreshToken'])
                    localStorage.setItem('rememberMe', rememberMe)
                } else {
                    sessionStorage.setItem('username', username)
                    sessionStorage.setItem('accessToken', response.data['accessToken'])
                    sessionStorage.setItem('refreshToken', response.data['refreshToken'])
                    sessionStorage.setItem('rememberMe', rememberMe)
                }
                navigate('/admin/portal', { replace: true })
                console.log('Logged In');
            })
            .catch((error) => {
                setError([true, error.response.data])
                console.log(error);
            });

    }

    useEffect(() => {
        const check = localStorage.getItem('rememberMe')
        const check2 = sessionStorage.getItem('rememberMe')
        if (check || check2) {
            navigate('/admin/portal', { replace: true })
        }
    }, [navigate])


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
                            width: 400,
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
                            <TextField error={error[0]} value={username} id="outlined-basic" label="Username" variant="outlined" onChange={handleUsername}
                                sx={{
                                    '& label.Mui-focused': {
                                        color: 'black', // Change the label color here
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'black',
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',  // Change the border color when focused
                                        }

                                    }
                                }} />
                            <TextField error={error[0]} value={password} id="outlined-basic" label="Password" type="password" variant="outlined" onChange={handlePassword}
                                sx={{
                                    '& label.Mui-focused': {
                                        color: 'black', // Change the label color here
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'black',
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',  // Change the border color when focused
                                        }

                                    }
                                }}
                            />
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleRememberMe} style={{ color: 'black' }} />} label="Remember Me" />
                            </FormGroup>
                            <Button disabled={(username == '' || password == '')} size="large" onClick={handleLogin} type="submit" sx={{ color: 'black' }}>Login</Button>
                            <Box sx={{ m: 3 }} />
                            {error[0] ? <Alert severity="error"> {error[1]} </Alert> : <></>}
                        </Stack>
                    </Paper>
                </Box>
            </center>
        </>
    )
}

export default AdminLogin
