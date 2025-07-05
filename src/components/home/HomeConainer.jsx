"use client"
// components
import Image from "next/image";
import ImageCarousel from "@/components/carousel/ImageCarousel.jsx";
import { PokemonThreeDMarquee } from "@/components/ui/pokemon-3d-marquee.jsx";
import { useEffect, useState } from "react";
import { Search, TrendingUp, Users, Package, Star } from "lucide-react";

/**
 * EXcards 폴더의 모든 이미지 파일명을 동적으로 생성하는 함수
 * @returns {string[]} 이미지 경로 배열
 */
const generateEXCardImages = () => {
  const imageFiles = [
    `a1-251`,
    `a1-252`,
    `a1-253`,
    `a1-254`,
    `a1-255`,
    `a1-256`,
    `a1-257`,
    `a1-258`,
    `a1-259`,
    `a1-260`,
    `a1-261`,
    `a1-262`,
    `a1-263`,
    `a1-264`,
    `a1-265`,
    `a1-274`,
    `a1-275`,
    `a1-284`,
    `a1-285`,
    `a1-286`,
    `a1-276`,
    `a1-277`,
    `a1-278`,
    `a1-279`,
    `a1-280`,
    `a1-281`,
    `a1-282`,
    `a1-283`,
    `a1a-075`,
    `a1a-076`,
    `a1a-077`,
    `a1a-078`,
    `a1a-079`,
    `a1a-083`,
    `a1a-084`,
    `a1a-085`,
    `a1a-086`,
    `a2-180`,
    `a2-181`,
    `a2-182`,
    `a2-183`,
    `a2-184`,
    `a2-185`,
    `a2-186`,
    `a2-187`,
    `a2-188`,
    `a2-189`,
    `a2-198`,
    `a2-199`,
    `a2-200`,
    `a2-201`,
    `a2-202`,
    `a2-203`,
    `a2-204`,
    `a2-205`,
    `a2-206`,
    `a2-207`,
  ];;
  
  return imageFiles.map(fileName => `${fileName}`);
};

/**
 * 배열을 랜덤하게 셔플하는 함수 (Fisher-Yates 알고리즘)
 * @param {Array} array 셔플할 배열
 * @returns {Array} 셔플된 새로운 배열
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
};

/**
 * 포켓몬 카드 카테고리 데이터 (닌텐도 스타일)
 */
const cardCategories = [
  { name: "EX 카드", description: "강력한 EX 포켓몬", icon: "⚡", color: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500", shadow: "shadow-yellow-200" },
  // { name: "GX 카드", description: "특수 GX 기술", icon: "🌟", color: "bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500", shadow: "shadow-purple-200" },
  // { name: "V 카드", description: "포켓몬 V 시리즈", icon: "💎", color: "bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500", shadow: "shadow-cyan-200" },
  { name: "VMAX 카드", description: "거대화 VMAX", icon: "🔥", color: "bg-gradient-to-br from-red-300 via-red-400 to-red-500", shadow: "shadow-red-200" },
  // { name: "일반 카드", description: "기본 포켓몬 카드", icon: "🍃", color: "bg-gradient-to-br from-green-300 via-green-400 to-green-500", shadow: "shadow-green-200" },
  { name: "트레이너 카드", description: "서포트 & 아이템", icon: "🎯", color: "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500", shadow: "shadow-blue-200" },
];

/**
 * 거래 통계 데이터 (닌텐도 스타일)
 */
const tradeStats = [
  { label: "총 거래량", value: "2,847", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-300" },
  { label: "활성 사용자", value: "1,234", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100", borderColor: "border-blue-300" },
  { label: "등록 상품", value: "5,672", icon: Package, color: "text-purple-600", bgColor: "bg-purple-100", borderColor: "border-purple-300" },
  { label: "평균 평점", value: "4.8", icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-100", borderColor: "border-yellow-300" },
];

export default function HomeContainer() {
  const [isClient, setIsClient] = useState(false);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 이미지를 랜덤하게 정렬
    const exImages = generateEXCardImages();
    const shuffledImages = shuffleArray(exImages);
    setRandomizedImages(shuffledImages);
    setIsClient(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* 닌텐도 스타일 타이틀 */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-blue-400 rounded-3xl blur-sm opacity-30"></div>
            <h1 className="relative text-5xl md:text-7xl font-black text-white px-8 py-4 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
              POCA MARKET
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-semibold">
            🎮 포켓몬 카드의 모든 것, 게임처럼 재미있는 거래 플랫폼 🎮
          </p>
          
          {/* 닌텐도 스타일 검색바 */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative bg-white rounded-full border-4 border-gray-800 shadow-xl">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-6 h-6" />
              <input
                type="text"
                placeholder="포켓몬 카드를 검색하세요! 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-4 py-5 text-lg rounded-full focus:outline-none font-semibold text-gray-800"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-8 py-3 rounded-full font-black hover:from-green-500 hover:to-blue-500 transition-all duration-300 shadow-lg border-2 border-white">
                GO!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3D 마퀴 카드 섹션 */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-gray-800 mb-4 relative inline-block">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                ⭐ 인기 카드 컬렉션 ⭐
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-semibold bg-yellow-100 px-6 py-3 rounded-full inline-block border-2 border-yellow-300">
              🎯 현재 가장 HOT한 포켓몬 카드들! 🎯
            </p>
          </div>
        </div>
        <div className="w-full">
          {isClient && <PokemonThreeDMarquee images={randomizedImages} />}
        </div>
      </section>

      {/* 카테고리 섹션 - 닌텐도 게임기 스타일 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                🎮 카드 카테고리 🎮
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-semibold bg-blue-100 px-6 py-3 rounded-full inline-block border-2 border-blue-300">
              🎯 나만의 카드를 찾아보세요! 🎯
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardCategories.map((category, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl ${category.color} ${category.shadow} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-4 border-white`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 text-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/90 mb-6 font-semibold text-lg">
                    {category.description}
                  </p>
                  <button className="bg-white text-gray-800 font-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-800 transform hover:scale-105">
                    START! →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 거래 통계 섹션 - 게임기 스타일 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">
                📊 실시간 게임 현황 📊
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-semibold bg-green-100 px-6 py-3 rounded-full inline-block border-2 border-green-300">
              🎮 포카마켓의 생생한 현황! 🎮
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradeStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.borderColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-4 group`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white ${stat.borderColor} border-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-black text-gray-800 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-700 font-bold text-sm uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 - 닌텐도 게임 스타일 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 rounded-3xl p-12 border-4 border-gray-800 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              🎮 게임 시작! 🎮
            </h2>
            <p className="text-xl text-gray-700 mb-8 font-semibold">
              ⭐ 포켓몬 카드 거래의 새로운 모험을 시작하세요! ⭐
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-10 py-5 rounded-full font-black text-lg hover:from-red-500 hover:to-pink-600 transition-all duration-300 shadow-xl border-4 border-white transform hover:scale-105">
                🎯 카드 판매하기
              </button>
              <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-10 py-5 rounded-full font-black text-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 shadow-xl border-4 border-white transform hover:scale-105">
                🔍 카드 둘러보기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}