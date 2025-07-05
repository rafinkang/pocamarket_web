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
 * 포켓몬 카드 카테고리 데이터
 */
const cardCategories = [
  { name: "EX 카드", description: "강력한 EX 포켓몬", icon: "⚡", color: "from-yellow-400 to-orange-500" },
  { name: "GX 카드", description: "특수 GX 기술", icon: "🌟", color: "from-purple-400 to-pink-500" },
  { name: "V 카드", description: "포켓몬 V 시리즈", icon: "💎", color: "from-blue-400 to-cyan-500" },
  { name: "VMAX 카드", description: "거대화 VMAX", icon: "🔥", color: "from-red-400 to-rose-500" },
  { name: "일반 카드", description: "기본 포켓몬 카드", icon: "🍃", color: "from-green-400 to-emerald-500" },
  { name: "트레이너 카드", description: "서포트 & 아이템", icon: "🎯", color: "from-indigo-400 to-blue-500" },
];

/**
 * 거래 통계 데이터
 */
const tradeStats = [
  { label: "총 거래량", value: "2,847", icon: TrendingUp, color: "text-green-500" },
  { label: "활성 사용자", value: "1,234", icon: Users, color: "text-blue-500" },
  { label: "등록 상품", value: "5,672", icon: Package, color: "text-purple-500" },
  { label: "평균 평점", value: "4.8", icon: Star, color: "text-yellow-500" },
];

export default function HomeContainer() {
  const [isClient, setIsClient] = useState(false);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const images = ["/next.svg", "/next.svg", "/next.svg", "/next.svg", "/next.svg"];

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 이미지를 랜덤하게 정렬
    const exImages = generateEXCardImages();
    const shuffledImages = shuffleArray(exImages);
    setRandomizedImages(shuffledImages);
    setIsClient(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 히어로 섹션 */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            포카마켓
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            포켓몬 카드의 모든 것, 안전하고 신뢰할 수 있는 거래 플랫폼
          </p>
          
          {/* 검색바 */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="원하는 포켓몬 카드를 검색해보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none shadow-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                검색
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3D 마퀴 카드 섹션 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            인기 카드 컬렉션
          </h2>
          <p className="text-center text-gray-600 mb-8">
            현재 가장 인기 있는 포켓몬 카드들을 만나보세요
          </p>
        </div>
        <div className="w-full">
          {isClient && <PokemonThreeDMarquee images={randomizedImages} />}
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            카드 카테고리
          </h2>
          <p className="text-center text-gray-600 mb-12">
            다양한 종류의 포켓몬 카드를 카테고리별로 찾아보세요
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardCategories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="p-8">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    더 보기 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 거래 통계 섹션 */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            실시간 거래 현황
          </h2>
          <p className="text-center text-gray-600 mb-12">
            포카마켓의 활발한 거래 현황을 확인해보세요
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradeStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            포켓몬 카드 거래의 새로운 경험을 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              카드 판매하기
            </button>
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              카드 둘러보기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}