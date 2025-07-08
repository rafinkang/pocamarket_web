/**
 * 주어진 날짜와 현재 시간의 차이를 계산하여 사용자 친화적인 문자열로 반환합니다.
 * @param {string | Date} date - 비교할 날짜
 * @returns {string} - 시간 차이를 나타내는 문자열
 */
export const getTimeDifference = (date) => {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInMinutes = Math.floor((now - targetDate) / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 10) {
    return "방금 전"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  } else if (diffInDays < 3) {
    return `${diffInDays}일 전`
  } else {
    // 3일 이상이면 MM-DD 형식으로 반환
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0')
    const dd = String(targetDate.getDate()).padStart(2, '0')
    return `${mm}월 ${dd}일`
  }
} 