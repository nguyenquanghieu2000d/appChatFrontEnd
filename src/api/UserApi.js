// /api/theloais

import axiosClient from "./axiosClient";

export const UserApi = {
    login: (user) => {
        const url = '/api/user/login';
        return axiosClient.post(url, user)
    },
    getAllUsers: () => {
        const url = "/api/user/"
        return axiosClient.get(url)
    }
}