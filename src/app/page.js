import Image from "next/image";
import HomeContainer from "@/components/home/HomeConainer";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full h-full">
      <HomeContainer/>
    </main>
  );
}
