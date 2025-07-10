import MyPageContainer from "./components/MyPageContainer";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "My Page",
  description: "내 정보 페이지입니다.",
  path: "/mypage",
  keywords: ["My Page", "내 정보", "내 정보 페이지", "내 정보 페이지 소개"],
});

export default function MyPagePage() {
  return (
    <MyPageContainer />
  )
}   
