import { useEffect, useRef } from "react";

/**
 * 컴포넌트의 바깥 영역을 클릭했을 때 특정 함수(콜백)를 실행하는 커스텀 훅
 * @param {function} callback - 바깥 영역 클릭 시 실행될 함수
 * @returns {React.RefObject} - 감지할 DOM 요소에 연결할 ref 객체
 */
export const useOutsideClick = (callback) => {
  // 감지할 DOM 요소를 참조하기 위한 ref 생성
  const ref = useRef(null);

  useEffect(() => {
    // 바깥 영역 클릭을 감지하는 이벤트 핸들러 함수
    const handleClickOutside = (event) => {
      // ref가 있고, ref가 감싸고 있는 요소의 내부에 클릭된 요소가 포함되어 있지 않다면
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // 인자로 받은 콜백 함수를 실행
      }
    };

    // mousedown 이벤트 리스너를 document에 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 사라질 때(unmount) 이벤트 리스너를 정리(clean-up)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // ref나 callback이 변경될 때만 effect를 다시 실행

  return ref; // 외부에서 사용할 수 있도록 ref를 반환
};