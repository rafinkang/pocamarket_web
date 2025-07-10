import PortfolioContainer from "./components/PortfolioContainer";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "저희 프로젝트 포트폴리오입니다.",
  path: "/portfolio",
  keywords: ["Portfolio", "포트폴리오", "포트폴리오 홈페이지", "포트폴리오 홈페이지 소개", "Hire me"],
});

export default function Portfolio() {
  return (
    <PortfolioContainer/>
  );
}