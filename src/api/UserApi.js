// /api/theloais

import axiosClient from "./axiosClient";

export const UserApi = {
    login: (user) => {
        const url = '/api/user/login';
        return axiosClient.post(url, user)
    },
}