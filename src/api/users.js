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
