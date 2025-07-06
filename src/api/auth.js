import callApi from "@/lib/callApi";

/**
 * 소셜 로그인
 * @param {object} [data] - { id: '', pwd: '' }
 */
export const postSocialLogin = async (provider, data) => {
  return callApi({
    method: 'POST',
    url: `/auth/social/login/${provider}`,
    data,
  });
};
