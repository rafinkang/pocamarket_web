import callApi from "@/lib/callApi";

/**
 * 사용자 등록
 * @param {object} [data] - { id: '', pwd: '', name: '', nickname: '' }
 */
export const postRegister = async (data) => {
  return callApi({
    method: 'post',
    url: '/register',
    data,
  });
};