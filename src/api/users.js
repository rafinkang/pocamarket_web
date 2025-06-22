import callApi from "@/lib/callApi";


/**
 * 유저 내 정보 조회
 */
export const getMyInfo = async () => {
    return callApi({
        method: 'get',
        url: '/user/me',
    });
};

export const updateMyInfo = async (data) => {
    return callApi({
        method: 'put',
        url: '/user/me',
        data,
    });
};

export const deleteMyInfo = async () => {
    return callApi({
        method: 'delete',
        url: '/user/me',
    });
};

export const checkNickname = async (nickname) => {
    return callApi({
        method: 'GET',
        url: `/user/checkNickname/${nickname}`,
    });
};
