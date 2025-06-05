import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"

const useAuthStore = create(
    // 상태를 영속적으로 저장하기 위한 미들웨어 (첫번째 인자: 상태값과 액션을 정의하는 함수, persist 옵션)
    persist(
        (set) => ({
            // 상태값
            isLoggedIn: false, // 로그인 여부
            user: null, // 사용자 정보

            // 액션
            // 로그인 후
            login: (userData) => set({
                isLoggedIn: true,
                user: {
                    nickname: userData.nickname,
                    lastLoginAt: userData.lastLoginAt
                }
            }),

            // 로그아웃 후
            logout: () => set({
                isLoggedIn: false,
                user: null
            })
        }),
        {
            name: 'auth-storage', // sessionStorage에 저장될 고유 키 이름
            storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
            // 특정 상태만 저장
            // partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }),
        }
    )
);

export default useAuthStore;