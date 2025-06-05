// 값이 비어있는지 확인
function isEmpty(value) {
    return value === null || value === undefined || String(value).trim() === '';
}

// 로그인 ID 유효성 검사
export function validateLoginId(loginId) {
    if (isEmpty(loginId)) return "로그인 ID는 필수입니다";
    if (loginId.length < 4 || loginId.length > 15) return "로그인 ID는 4~15자 사이여야 합니다";
    return true;
}

// 비밀번호 유효성 검사
export function validatePassword(password) {
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/;
    if (isEmpty(password)) return "비밀번호는 필수입니다";
    if (password.length < 8 || password.length > 20) return "비밀번호는 8~20자 사이여야 합니다";
    if (!pattern.test(password)) return "비밀번호는 숫자, 영문자, 특수문자를 각각 1개 이상 포함해야 합니다";
    return true;
}

// 이름 유효성 검사
export function validateName(name) {
    if (isEmpty(name)) return "이름은 필수입니다";
    if (name.length > 10) return "이름은 10자 이하여야 합니다";
    return true;
}

// 닉네임 유효성 검사
export function validateNickname(nickname) {
    if (isEmpty(nickname)) return "닉네임은 필수입니다";
    if (nickname.length > 8) return "닉네임은 8자 이하여야 합니다";
    return true;
}