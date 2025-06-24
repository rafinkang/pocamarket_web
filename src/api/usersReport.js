import callApi from "@/lib/callApi";

export const postUserReport = async (data) => {
    return callApi({
        method: 'post',
        url: '/user-report',
        data,
    });
};

