import { useState, useEffect } from 'react'
import classes from './login.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button, Stack, TextField, Paper, Box, Typography, FormGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';


function AdminSignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDOB] = useState(dayjs())
    const [error, setError] = useState([false, ''])

    const navigate = useNavigate()
    const APP_URL = import.meta.env.VITE_SERVER_URL;


    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)



    const handleSignUp = () => {
        const user = {
            username: username,
            password: password,
            name: name,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
            dob: dob.$d.toLocaleDateString('en-GB').replaceAll("/", '-')
        }

        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: APP_URL + '/admin',
            headers: {},
            data: user
        };
        
        axios.request(config)
            .then((response) => {
                console.log(response)
                navigate('/admin/login', { replace: true })
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
                            width: 700,
                            height: 500,
                        },
                    }}
                >
                    <Paper elevation={20}>
                        <Stack direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <Box sx={{ m: 1 }} />
                            <Typography variant="h5"> Admin Sign-Up </Typography>
                            <Box sx={{ m: 2 }} />
                            <Stack direction={"row"} spacing={4}>
                                <TextField error={error[0]} value={name} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => { setName(e.target.value) }}
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
                                <TextField error={error[0]} value={email} id="outlined-basic" label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }}
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
                            </Stack>
                            <Stack direction={"row"} spacing={4}>
                                <TextField error={error[0]} value={username} id="outlined-basic" label="Username" variant="outlined" onChange={handleUsername} helperText="*Alphanumeric"
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
                                <TextField error={error[0]} value={password} id="outlined-basic" label="Password" type="password" variant="outlined" onChange={handlePassword} helperText="*Eight Characters and One number"
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
                            </Stack>
                            <Stack direction={"row"} spacing={4}>
                                <TextField error={error[0]} value={phone} id="outlined-basic" label="Phone" variant="outlined" onChange={(e) => { setPhone(e.target.value) }}
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
                                <TextField error={error[0]} value={address} id="outlined-basic" label="Address" variant="outlined" onChange={(e) => { setAddress(e.target.value) }}
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
                            </Stack>
                            <Stack direction={"row"} spacing={4}>
                                <FormGroup>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={gender}
                                            label="Gender"
                                            onChange={(e) => { setGender(e.target.value) }}
                                            style={{ color: 'black', width: "227px" }}
                                        >
                                            <MenuItem value={'M'}>M</MenuItem>
                                            <MenuItem value={'F'}>F</MenuItem>
                                            <MenuItem value={'X'}>X</MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div style={{ width: "227px" }}>
                                        <DatePicker defaultValue={dob} format='DD-MM-YYYY' label="DOB" value={dob} onChange={(value) => { setDOB(value) }} />
                                    </div>
                                </LocalizationProvider>
                            </Stack>
                            <Box sx={{ m: 1 }} />
                            <Button disabled={(username == '' || password == '')} size="large" onClick={handleSignUp} type="submit" sx={{ color: 'black' }}>Sign Up</Button>
                            <Box sx={{ m: 3 }} />
                            {error[0] ? <Alert severity="error"> {error[1]} </Alert> : <></>}
                        </Stack>
                    </Paper>
                </Box>
            </center>
        </>
    )
}

export default AdminSignUp
