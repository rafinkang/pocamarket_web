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

/**
 * 포켓몬 카드 상세 조회
 */
export const getPokemonCardDetail = async (code) => {
    return callApi({
        method: 'get',
        url: `/pokemon-card/detail/${code}`,
    });
};

