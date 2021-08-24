// /api/theloais

import axiosClient from "./axiosClient";

export const ChatApi = {
    getAllMessageAndFileForm2User: (params) => {
        const url = '/api/chat';
        return axiosClient.get(url, {params: params})
    }
}