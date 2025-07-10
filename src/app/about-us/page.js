import AboutUsContainer from "@/app/about-us/AboutUsContainer";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description: "저희 개발팀을 소개합니다. 뽑아주세요. 제발요.",
  path: "/about-us",
  keywords: ["About Us", "개발팀 소개", "개발자 놀아요", "연락주세요"],
});

export default function AboutUs() {
  return (
    <AboutUsContainer/>
  );
}
