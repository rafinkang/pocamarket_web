// 쿼리스트링을 객체로 변환하는 함수
export const parseQueryString = (search) => {
    const params = {};
    if (!search) return params;
    search
        .replace(/^\?/, "")
        .split("&")
        .forEach((pair) => {
            if (!pair) return;
            const [k, v] = pair.split("=");
            params[decodeURIComponent(k)] = decodeURIComponent(v ?? "");
        });
    return params;
};

// 쿼리스트링을 만들어주는 함수
export const makeQueryString = (params) => {
    const esc = encodeURIComponent;
    return (
        "?" +
        Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => esc(k) + "=" + esc(v))
            .join("&")
    );
};