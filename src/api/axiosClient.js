import axios from "axios";
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },

    paramsSerializer: params => queryString.stringify(params),

});
axiosClient.interceptors.request.use(async (config) => {
// Handle token here ...
//     config.headers = {
//         'Authorization': `Bearer ` + process.env.REACT_APP_TOKEN,
//     }
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
// Handle errors
    throw error;
});
export default axiosClient;