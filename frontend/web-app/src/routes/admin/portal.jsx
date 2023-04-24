import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, Card, CardContent } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MUI
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function AdminPortal() {
    const [open, setOpen] = React.useState(true);
    const [jobs, setJobs] = React.useState([]);
    const [profile, setProfile] = React.useState({});
    const [title, setTitle] = React.useState('Dashboard');
    const navigate = useNavigate()

    const username = localStorage.getItem('username')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        localStorage.clear()
        navigate('/admin/login', { replace: true })
        window.location.reload(true)
    }

    const handleDashboard = () => {
        setTitle('Dashboard')
    }

    const handleAdmins = () => {
        setTitle('Admin')
    }

    const handleEmployers = () => {
        setTitle('Employers')
    }

    const handleEmployees = () => {
        setTitle('Employees')
    }

    const handleJobs = () => {
        setTitle('Jobs')
    }

    const handleProfile = () => {
        setTitle('My Profile')
    }

    const showDashboard = (
        <>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {/* <Chart /> */}
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {/* <Deposits /> */}
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        {/* <Orders /> */}
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </>
    )

    const showProfile = (
        <>
            <Card>
                <CardContent align='left'>
                    <img src={'http://localhost:3000/admin/' + username + '/getImage'} height={200} width={200} align='right'/>
                    <Typography sx={{ fontSize: 25 }}>
                        {profile.name}
                    </Typography>
                    <Typography>
                        ID: {profile.admin_id}
                    </Typography>
                    <Typography>
                        Username: {profile.username}
                    </Typography>
                    <Typography>
                        Phone: {profile.phone}
                    </Typography>
                    <Typography>
                        Email: {profile.email}
                    </Typography>
                    <Typography>
                        Address: {profile.address}
                    </Typography>
                    <Typography>
                        DOB: {profile.dob}
                    </Typography>
                    <Typography>
                        Gender: {profile.gender}
                    </Typography>
                    <Typography>
                        Join Date: {profile.join_date}
                    </Typography>
                </CardContent>
                {/* {JSON.stringify(profile)} */}
            </Card>
        </>
    )

    React.useEffect(() => {
        const check = localStorage.getItem('rememberMe')
        if (!check) {
            navigate('/admin/login', { replace: true })
            window.location.reload(true)
            return () => localStorage.clear()
        }

    }, [navigate])

    React.useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/admin/' + username,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };

        axios.request(config)
            .then((response) => {
                setProfile(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [accessToken, profile, username])

    document.body.style.display = 'contents'
    const element = document.getElementById('root')
    element.style.margin = 0
    element.style.padding = 0
    element.style.maxWidth = 'initial'
    // element.style.maxWidth = 0

    let body;
    switch (title) {
        case 'My Profile':
            body = showProfile
            break;

        default:
            body = showDashboard
            break;
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <React.Fragment>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon onClick={handleDashboard} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" onClick={handleDashboard} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon onClick={handleAdmins} />
                                </ListItemIcon>
                                <ListItemText primary="Admin" onClick={handleAdmins} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon onClick={handleEmployees} />
                                </ListItemIcon>
                                <ListItemText primary="Employees" onClick={handleEmployees} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon onClick={handleEmployers} />
                                </ListItemIcon>
                                <ListItemText primary="Employers" onClick={handleEmployers} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BarChartIcon onClick={handleJobs} />
                                </ListItemIcon>
                                <ListItemText primary="Jobs" onClick={handleJobs} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircle onClick={handleProfile} />
                                </ListItemIcon>
                                <ListItemText primary="Profile" onClick={handleProfile} />
                            </ListItemButton>
                        </React.Fragment>
                        <Divider sx={{ my: 1 }} />

                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {body}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default AdminPortal