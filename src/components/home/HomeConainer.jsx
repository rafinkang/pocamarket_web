// components
import Image from "next/image";
import ImageCarousel from "@/components/carousel/ImageCarousel.jsx";

export default function HomeContainer() {
  const images = ["/next.svg", "/next.svg", "/next.svg", "/next.svg", "/next.svg"]

  return (
    <div className="w-full">
      <ImageCarousel images={images} className="w-full max-h-[220px]"/>
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </div>
  )
}