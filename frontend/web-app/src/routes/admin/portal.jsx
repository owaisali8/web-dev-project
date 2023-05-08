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
import { Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Fab, Stack, TableFooter, Tooltip } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AccountCircle } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchAndUpdateJobs, fetchAndUpdateProfile, fetchAndUpdateAccessToken, deleteJob, fetchAndUpdateJobsPaged } from '../../api/api'
import { fetchAndUpdateAdmins, fetchAndUpdateEmployers, fetchAndUpdateEmployees, updateEmployeeVerification } from '../../api/api'
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';

const APP_URL = import.meta.env.VITE_SERVER_URL;

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
    const [admins, setAdmins] = React.useState([]);
    const [employers, setEmployers] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [profile, setProfile] = React.useState({});
    const [title, setTitle] = React.useState('Dashboard');
    //const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [dashboardPage, setDashboardPage] = React.useState(0);
    const [rowsPerPageDashboard, setRowsPerPageDashboard] = React.useState(3);

    const [username, setUsername] = React.useState('')
    const [accessToken, setAccessToken] = React.useState('')
    const [refreshToken, setRefreshToken] = React.useState('')
    const [rememberMe, setRememberMe] = React.useState(false)
    const [expiry, setExpiry] = React.useState(false)
    const [dialog, setDialog] = React.useState([false, 0])

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    const handleLogout = () => {
        sessionStorage.clear()
        localStorage.clear()
        window.location = '/admin/login'
    }

    const handleDashboard = () => {
        setTitle('Dashboard')
    }

    const handleAdmins = () => {
        setTitle('Admins')
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
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 450,
                        }}
                    >
                        <Typography component="div" variant="h5">Recent Jobs:</Typography>
                        <Box sx={{ m: 1 }} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="a dense table" size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Job ID</TableCell>
                                        <TableCell align="right">Title</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Completed</TableCell>
                                        <TableCell align="right">Date Posted</TableCell>
                                        <TableCell align="right">Employer ID</TableCell>
                                        <TableCell align="right">Job Type</TableCell>
                                        <TableCell align="right">Salary</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobs
                                        .slice()
                                        .sort((a, b) => b.job_id - a.job_id)
                                        .slice(dashboardPage * rowsPerPageDashboard, dashboardPage * rowsPerPageDashboard + rowsPerPageDashboard)
                                        .map((job) => (
                                            <TableRow
                                                key={job.job_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{job.job_id} </TableCell>
                                                <TableCell align="right">{job.title}</TableCell>
                                                <TableCell align="right">{job.description}</TableCell>
                                                <TableCell align="right">{job.completed ? <CheckIcon /> : <CloseIcon />}</TableCell>
                                                <TableCell align="right">{job.date_posted}</TableCell>
                                                <TableCell align="right">{job.employer_id}</TableCell>
                                                <TableCell align="right">{job.job_type}</TableCell>
                                                <TableCell align="right">{job.salary}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            count={jobs.length}
                                            rowsPerPageOptions={[3, 5]}
                                            rowsPerPage={rowsPerPageDashboard}
                                            page={dashboardPage}
                                            onPageChange={(event, newPage) => { setDashboardPage(newPage) }}
                                            onRowsPerPageChange={(event) => {
                                                setRowsPerPageDashboard(parseInt(event.target.value, 10))
                                                setDashboardPage(0);
                                            }}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>

                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 450,
                        }}
                    >
                        <Box sx={{ m: 2 }} />
                        <Typography component="div" variant="h6">Jobs: {jobs.length}</Typography>
                        <Box sx={{ m: 2 }} />
                        <Typography component="div" variant="h6">Completed Jobs: {jobs.filter((obj) => obj.completed).length}</Typography>
                        <Box sx={{ m: 2 }} />
                        <Typography component="div" variant="h6">Uncompleted Jobs: {jobs.filter((obj) => !obj.completed).length}</Typography>
                        <Box sx={{ m: 2 }} />
                        <Typography component="div" variant="h6">Employees: {employees.length}</Typography>
                        <Box sx={{ m: 2 }} />
                        <Typography component="div" variant="h6">Employers: {employers.length}</Typography>
                        <Box sx={{ m: 2 }} />
                        <Typography component="div" variant="h6">Admin: {admins.length}</Typography>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                {/* <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>                        
                    </Paper>
                </Grid> */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </>
    )

    const showProfile = (
        <>
            <Card>
                <CardContent align='left'>
                    <img src={APP_URL + '/admin/' + username + '/getImage'} height={200} width={200}
                        align='right' style={{ borderRadius: "50%" }} />
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

    const showAdmin = (
        <>
            <Stack direction="row" spacing={2}>
                <Tooltip title="Refresh" arrow>
                    <Fab color="primary" align="right" aria-label="add" size='medium'
                        onClick={() => {
                            fetchAndUpdateAdmins(accessToken, setAdmins);
                        }}
                        sx={{
                            bgcolor: 'black', '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }}>
                        <RefreshIcon />
                    </Fab>
                </Tooltip>
            </Stack>
            <Box sx={{ m: 2 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Admin ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Join Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((admin) => (
                            <TableRow
                                key={admin.admin_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{admin.admin_id} </TableCell>
                                <TableCell align="right">{admin.name}</TableCell>
                                <TableCell align="right">{admin.username}</TableCell>
                                <TableCell align="right">{admin.phone}</TableCell>
                                <TableCell align="right">{admin.email}</TableCell>
                                <TableCell align="right">{admin.address}</TableCell>
                                <TableCell align="right">{admin.dob}</TableCell>
                                <TableCell align="right">{admin.gender}</TableCell>
                                <TableCell align="right">{admin.join_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={admins.length}
                                rowsPerPageOptions={[10, 15]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )

    const showEmployer = (
        <>
            <Stack direction="row" spacing={2}>
                <Tooltip title="Refresh" arrow>
                    <Fab color="primary" align="right" aria-label="add" size='medium'
                        onClick={() => {
                            fetchAndUpdateEmployers(accessToken, setEmployers);
                        }}
                        sx={{
                            bgcolor: 'black', '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }}>
                        <RefreshIcon />
                    </Fab>
                </Tooltip>
            </Stack>
            <Box sx={{ m: 2 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Employer ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Join Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employer) => (
                            <TableRow
                                key={employer.employer_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{employer.employer_id} </TableCell>
                                <TableCell align="right">{employer.name}</TableCell>
                                <TableCell align="right">{employer.username}</TableCell>
                                <TableCell align="right">{employer.phone}</TableCell>
                                <TableCell align="right">{employer.email}</TableCell>
                                <TableCell align="right">{employer.address}</TableCell>
                                <TableCell align="right">{employer.dob}</TableCell>
                                <TableCell align="right">{employer.gender}</TableCell>
                                <TableCell align="right">{employer.join_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={employers.length}
                                rowsPerPageOptions={[10, 15]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )

    const showEmployees = (
        <>
            <Stack direction="row" spacing={2}>
                <Tooltip title="Refresh" arrow>
                    <Fab color="primary" align="right" aria-label="add" size='medium'
                        onClick={() => {
                            fetchAndUpdateEmployees(accessToken, setEmployees);
                        }}
                        sx={{
                            bgcolor: 'black', '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }}>
                        <RefreshIcon />
                    </Fab>
                </Tooltip>
            </Stack>
            <Box sx={{ m: 2 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">CNIC</TableCell>
                            <TableCell align="right">Job Type</TableCell>
                            <TableCell align="right">Join Date</TableCell>
                            <TableCell align="right">Verified</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">Verify</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                            <TableRow
                                key={employee.employee_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{employee.employee_id} </TableCell>
                                <TableCell align="right">{employee.name}</TableCell>
                                <TableCell align="right">{employee.username}</TableCell>
                                <TableCell align="right">{employee.phone}</TableCell>
                                <TableCell align="right">{employee.email}</TableCell>
                                <TableCell align="right">{employee.address}</TableCell>
                                <TableCell align="right">{employee.dob}</TableCell>
                                <TableCell align="right">{employee.gender}</TableCell>
                                <TableCell align="right">{employee.cnic_no}</TableCell>
                                <TableCell align="right">{employee.job_type}</TableCell>
                                <TableCell align="right">{employee.join_date}</TableCell>
                                <TableCell align="right">{employee.verified ? <CheckIcon /> : <CloseIcon />}</TableCell>
                                <TableCell align="right">{employee.rating}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="change" onClick={() => {
                                        const verified = employee.verified ? 'false' : 'true'
                                        updateEmployeeVerification(accessToken, employee.username, verified)
                                        setTimeout(() => fetchAndUpdateEmployees(accessToken, setEmployees), 500)
                                    }}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={employees.length}
                                rowsPerPageOptions={[10, 15]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )

    const showJobs = (
        <>
            <Stack direction="row" spacing={2}>
                <Tooltip title="Refresh" arrow>
                    <Fab color="primary" align="right" aria-label="add" size='medium'
                        onClick={() => {
                            fetchAndUpdateJobs(accessToken, setJobs);
                        }}
                        sx={{
                            bgcolor: 'black', '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }}>
                        <RefreshIcon />
                    </Fab>
                </Tooltip>
            </Stack>
            <Box sx={{ m: 2 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Job ID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Completed</TableCell>
                            <TableCell align="right">Date Posted</TableCell>
                            <TableCell align="right">Employer ID</TableCell>
                            <TableCell align="right">Job Type</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
                            <TableRow
                                key={job.job_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{job.job_id} </TableCell>
                                <TableCell align="right">{job.title}</TableCell>
                                <TableCell align="right">{job.description}</TableCell>
                                <TableCell align="right">{job.completed ? <CheckIcon /> : <CloseIcon />}</TableCell>
                                <TableCell align="right">{job.date_posted}</TableCell>
                                <TableCell align="right">{job.employer_id}</TableCell>
                                <TableCell align="right">{job.job_type}</TableCell>
                                <TableCell align="right">{job.salary}</TableCell>
                                <TableCell align="right"><IconButton onClick={() => {
                                    setDialog([true, job.job_id])
                                }}
                                    aria-label="delete"><DeleteIcon /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={jobs.length}
                                rowsPerPageOptions={[10, 15, 1]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog
                open={dialog[0]}
                onClose={() => { setDialog(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setDialog(false) }}>No</Button>
                    <Button onClick={() => {
                        deleteJob(accessToken, dialog[1])
                        fetchAndUpdateJobs(accessToken, setJobs)
                        setDialog(false)
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

    React.useEffect(() => { // For checking whether user has logged in or not?
        const check = localStorage.getItem('rememberMe')
        const check2 = sessionStorage.getItem('rememberMe')
        if (!check && !check2) {
            window.location = '/admin/login'
            return () => localStorage.clear()
        } else if (check) {
            setUsername(localStorage.getItem('username'))
            setAccessToken(localStorage.getItem('accessToken'))
            setRefreshToken(localStorage.getItem('refreshToken'))
            setRememberMe(true)
        } else if (check2) {
            setUsername(sessionStorage.getItem('username'))
            setAccessToken(sessionStorage.getItem('accessToken'))
            setRefreshToken(sessionStorage.getItem('refreshToken'))
            setRememberMe(false)
        }

    }, [])

    React.useEffect(() => { // For loading data

        if (accessToken) {
            console.log("First Fetch");
            fetchAndUpdateJobs(accessToken, setJobs);
            fetchAndUpdateProfile(username, accessToken, setProfile, setExpiry);
            fetchAndUpdateAdmins(accessToken, setAdmins);
            fetchAndUpdateEmployers(accessToken, setEmployers);
            fetchAndUpdateEmployees(accessToken, setEmployees);

        }
    }, [accessToken, username])

    React.useEffect(() => {
        if (expiry) {
            fetchAndUpdateAccessToken(refreshToken, setAccessToken, setRefreshToken)
            if (rememberMe) {
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
            } else {
                sessionStorage.setItem('accessToken', accessToken)
                sessionStorage.setItem('refreshToken', refreshToken)
            }

            setExpiry(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expiry])

    React.useEffect(() => {
        if (accessToken)
            fetchAndUpdateJobsPaged(accessToken, setJobs, page, rowsPerPage)
    }, [accessToken, page, rowsPerPage])


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
        case 'Admins':
            body = showAdmin
            break;
        case 'Jobs':
            body = showJobs
            break;
        case 'Employers':
            body = showEmployer
            break;
        case 'Employees':
            body = showEmployees
            break;
        default:
            body = showDashboard
            break;
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ bgcolor: 'black' }}>
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