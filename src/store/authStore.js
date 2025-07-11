import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import { postLogout } from "@/api/login";

const useAuthStore = create(
  // 상태를 영속적으로 저장하기 위한 미들웨어 (첫번째 인자: 상태값과 액션을 정의하는 함수, persist 옵션)
  persist(
    (set) => ({
      // 상태값
      isLogin: false, // 로그인 여부
      user: null, // 사용자 정보
      hasHydrated: false, // localStorage에서 데이터 복원 완료 여부

      // 액션
      // 로그인 후
      login: (userData) => set({
        isLogin: true,
        user: {
          nickname: userData.nickname,
          status: userData.status,
          grade: userData.grade,
          gradeDesc: userData.gradeDesc,
          profileImageUrl: userData.profileImageUrl,
          lastLoginAt: userData.lastLoginAt,
        }
      }),

      // 로그아웃 후
      logout: async () => {
        try {
          await postLogout()
          set({
            isLogin: false,
            user: null
          })
          location.reload();
        } catch (error) {
          console.error('Error in logout server action:', error);
        }
      },

      clear: () => set({
        isLogin: false,
        user: null
      }),

      // hydration 상태 설정
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 고유 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage 사용
      // 특정 상태만 저장 (hasHydrated는 저장하지 않음)
      partialize: (state) => ({ isLogin: state.isLogin, user: state.user }),
      // hydration 완료 시 실행할 콜백
      onRehydrateStorage: () => (state) => {
        console.log('localStorage에서 데이터 복원 완료:', state);
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;