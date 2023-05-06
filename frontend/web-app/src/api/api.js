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

export function fetchAndUpdateProfile(username, accessToken, setProfile) {
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
        });
}


