import axios from 'axios';

const APP_URL = import.meta.env.VITE_SERVER_URL;

export function fetchAndUpdateEmployers(accessToken, setEmployer) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: APP_URL + '/employer',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.request(config)
        .then((response) => {
            setEmployer(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function fetchAndUpdateEmployees(accessToken, setEmployee) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: APP_URL + '/employee',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.request(config)
        .then((response) => {
            setEmployee(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function updateEmployeeVerification(accessToken, username, verified) {
    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: APP_URL + '/employee/changeVerfication',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data : {
            username: username,
            verified: verified
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response.status);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function fetchAndUpdateAdmins(accessToken, setAdmins) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: APP_URL + '/admin',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.request(config)
        .then((response) => {
            setAdmins(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function fetchAndUpdateJobs(accessToken, setJobs) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: APP_URL + '/jobs',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.request(config)
        .then((response) => {
            setJobs(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function fetchAndUpdateProfile(username, accessToken, setProfile, setExpiry) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: APP_URL + `/admin/${username}`,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.request(config)
        .then((response) => {
            setProfile(response.data);
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status == 403) {
                setExpiry(true)
            }
        });
}

export function fetchAndUpdateAccessToken(refreshToken, setAccessToken, setRefreshToken) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: APP_URL + '/admin/refreshToken',
        data: {
            refreshToken: refreshToken
        }
        
    };

    axios.request(config)
        .then((response) => {
            console.log("AccessToken Refreshed")
            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function deleteJob(accessToken, job_id) {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: APP_URL + `/jobs/${job_id}`,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        });
}


