import axios from 'axios';

const APP_URL = import.meta.env.VITE_SERVER_URL;

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


