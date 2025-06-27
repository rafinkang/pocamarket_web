import callApi from "@/lib/callApi";

export const postUserReport = async (data) => {
    return callApi({
        method: 'post',
        url: '/user-report',
        data,
    });
};

export const getUserReport = async (params) => {
    return callApi({
        method: 'get',
        url: '/user-report',
        params,
    });
};

