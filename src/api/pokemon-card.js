import callApi from "@/lib/callApi";

/**
 * 포켓몬 카드 리스트 조회
 */
export const getPokemonCardList = async (params) => {
    return callApi({
        method: 'get',
        url: '/pokemon-card/list',
        params,
    });
};
