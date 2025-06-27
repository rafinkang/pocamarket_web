import callApi from "@/lib/callApi";

export const postTcgTradeRequest = async (tradeId, data) => {
  return callApi({
    method: "POST",
    url: `/tcg-trade/${tradeId}/request`,
    data,
  });
}

export const getTcgTradeRequestList = async (tradeId) => {
  return callApi({
    method: "GET",
    url: `/tcg-trade/request/${tradeId}`,
  });
}

export const updateTcgTradeRequestStatus = async (tradeId, data) => {
  return callApi({
    method: "PATCH",
    url: `/tcg-trade/request/${tradeId}`,
    data,
  });
}

export const deleteTcgTradeRequest = async (tradeId, data) => {
  return callApi({
    method: "DELETE",
    url: `/tcg-trade/request/${tradeId}`,
    data,
  });
}