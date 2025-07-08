"use client"
// components
import Image from "next/image";
import ImageCarousel from "@/components/carousel/ImageCarousel.jsx";
import { PokemonThreeDMarquee } from "@/components/ui/pokemon-3d-marquee.jsx";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Search, Users, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

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
  { name: "GOLD 카드", description: "희귀한 빤짝이!", icon: "⚡", color: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500", shadow: "shadow-yellow-200", link: "/pokemon-card?rarity=GOLD+CROWN" },
  { name: "EX 카드", description: "강력한 EX 포켓몬", icon: "🔥", color: "bg-gradient-to-br from-red-300 via-red-400 to-red-500", shadow: "shadow-red-200", link: "/pokemon-card?rarity=RARE+EX" },
  { name: "트레이너 카드", description: "서포트 & 아이템", icon: "🎯", color: "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500", shadow: "shadow-blue-200", link: "/pokemon-card?type=TRAINER" },
  // { name: "GX 카드", description: "특수 GX 기술", icon: "🌟", color: "bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500", shadow: "shadow-purple-200" },
  // { name: "V 카드", description: "포켓몬 V 시리즈", icon: "💎", color: "bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500", shadow: "shadow-cyan-200" },
  // { name: "일반 카드", description: "기본 포켓몬 카드", icon: "🍃", color: "bg-gradient-to-br from-green-300 via-green-400 to-green-500", shadow: "shadow-green-200" },
];

/**
 * 프로젝트 소개 데이터 (닌텐도 스타일)
 */
const projectFeatures = [
  { 
    name: "About Us", 
    description: "개발팀 소개", 
    icon: "👥", 
    color: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600", 
    shadow: "shadow-blue-300", 
    link: "/about-us" 
  },
  { 
    name: "Portfolio", 
    description: "기술 포트폴리오", 
    icon: "📁", 
    color: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600", 
    shadow: "shadow-purple-300", 
    link: "/portfolio" 
  },
];

export default function HomeContainer() {
  const router = useRouter();
  // 상태 초기화 - controlled input을 위해 명확한 초기값 설정
  const [isClient, setIsClient] = useState(false);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 빈 문자열로 명확히 초기화
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // 각 섹션에 대한 ref
  const heroRef = useRef(null);
  const categoryRef = useRef(null);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);
  const containerRef = useRef(null);

  // 섹션 배열 메모이제이션
  const sections = useMemo(() => [heroRef, categoryRef, ctaRef, aboutRef], []);

  // 이미지 셔플링을 한 번만 실행
  const shuffledImages = useMemo(() => {
    const exImages = generateEXCardImages();
    return shuffleArray(exImages);
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트될 때만 이미지 설정
    setRandomizedImages(shuffledImages);
    setIsClient(true);
  }, [shuffledImages]);

  // 검색어 변경 핸들러 메모이제이션
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    router.push(`/pokemon-card?nameKo=${searchQuery}`);
  };

  // 섹션 이동 함수 메모이제이션
  const scrollToSection = useCallback((index) => {
    if (index >= 0 && index < sections.length && sections[index].current) {
      sections[index].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [sections]);

  // 맨위로 가기 함수
  const scrollToTop = useCallback(() => {
    scrollToSection(0);
  }, [scrollToSection]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            // 현재 섹션 업데이트
            const sectionIndex = sections.findIndex(ref => ref.current?.id === entry.target.id);
            if (sectionIndex !== -1) {
              setCurrentSection(sectionIndex);
            }
          }
        });
      },
      {
        threshold: 0.5, // 50%가 보이면 트리거
        rootMargin: '0px',
      }
    );

    // 모든 섹션 관찰 시작
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sections]);

  // 휠 이벤트 핸들러 메모이제이션
  const handleWheel = useCallback((e) => {
    if (isScrolling) return;

    e.preventDefault();
    setIsScrolling(true);

    const delta = e.deltaY;
    let nextSection = currentSection;

    if (delta > 0 && currentSection < sections.length - 1) {
      // 아래로 스크롤
      nextSection = currentSection + 1;
    } else if (delta < 0 && currentSection > 0) {
      // 위로 스크롤
      nextSection = currentSection - 1;
    }

    if (nextSection !== currentSection) {
      scrollToSection(nextSection);
    }

    // 스크롤 딜레이 설정
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [currentSection, isScrolling, scrollToSection, sections.length]);

  // 휠 이벤트 핸들러 - window에서 전체 화면 스크롤 가능
  useEffect(() => {
    // window에 이벤트 리스너 추가하여 전체 화면에서 스크롤 가능
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // 스크롤 힌트 컴포넌트 메모이제이션
  const ScrollHint = useCallback(({ isLastSection = false }) => {
    if (isLastSection) return null;

    return (
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-800 opacity-70 hover:opacity-100">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100dvh] bg-white overflow-hidden"
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}
    >
      {/* 스크롤바 숨기기 스타일 */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory scroll-pt-[65px]"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* 히어로 섹션 + 인기 카드 컬렉션 */}
        <section 
          ref={heroRef}
          id="hero"
          className={`relative py-4 md:py-8 px-4 snap-start h-[calc(100dvh-65px)] flex flex-col justify-center transition-all duration-1000 ${
            visibleSections.has('hero') 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="max-w-7xl mx-auto text-center w-full flex-1 flex flex-col justify-center max-h-[calc(100dvh-65px-2rem)] overflow-hidden">
            {/* 닌텐도 스타일 타이틀 */}
            <div className={`relative flex justify-center mb-4 md:mb-8 transition-all duration-1000 delay-200 ${
              visibleSections.has('hero') 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-10 scale-95'
            }`}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-blue-400 rounded-3xl blur-sm opacity-30"></div>
                <h1 className="relative text-3xl sm:text-4xl md:text-6xl font-black text-white px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-2xl md:rounded-3xl shadow-2xl border-2 md:border-4 border-white transform hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                  POCA MARKET
                </h1>
              </div>
            </div>
            
            <p className={`text-sm sm:text-lg md:text-xl text-gray-700 mb-3 md:mb-6 font-semibold px-2 transition-all duration-1000 delay-400 ${
              visibleSections.has('hero') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}>
              🎮 포켓몬 카드의 모든 것, 게임처럼 재미있는 거래 플랫폼 🎮
            </p>
            
            {/* 닌텐도 스타일 검색바 */}
            <div className={`relative w-full max-w-2xl mx-auto mb-4 md:mb-8 px-4 transition-all duration-1000 delay-600 ${
              visibleSections.has('hero') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}>
              <div className="relative bg-white rounded-full border-2 md:border-4 border-gray-800 shadow-xl">
                <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  name="pokemon-card-search"
                  placeholder="포켓몬 카드를 검색하세요! 🔍"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-10 md:pl-14 pr-4 py-3 md:py-4 text-sm md:text-lg rounded-full focus:outline-none font-semibold text-gray-800"
                />
                <button 
                  onClick={handleSearchClick}
                  className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-black text-sm md:text-base hover:from-green-500 hover:to-blue-500 transition-all duration-300 shadow-lg border-1 md:border-2 border-white cursor-pointer"
                >
                  GO!
                </button>
              </div>
            </div>

            {/* 3D 마퀴 카드 */}
            <div className={`w-full transition-all duration-1000 delay-800 ${
              visibleSections.has('hero') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}>
              {isClient && <PokemonThreeDMarquee images={randomizedImages} />}
            </div>
          </div>
          
          {/* 스크롤 힌트 */}
          <ScrollHint />
        </section>

        {/* 카테고리 섹션 - 닌텐도 게임기 스타일 */}
        <section 
          ref={categoryRef}
          id="category"
          className={`relative py-4 md:py-8 px-4 snap-start h-[calc(100dvh-65px)] mt-[65px] flex items-center transition-all duration-1000 ${
            visibleSections.has('category') 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="max-w-6xl mx-auto w-full max-h-[calc(100dvh-65px-2rem)] overflow-y-auto">
            <div className={`text-center mb-6 md:mb-12 transition-all duration-1000 delay-200 ${
              visibleSections.has('category') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-2 md:mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                  🎮 카드 카테고리 🎮
                </span>
              </h2>
              <p className="text-sm md:text-lg text-gray-600 font-semibold bg-blue-100 px-4 md:px-6 py-2 md:py-3 rounded-full inline-block border-1 md:border-2 border-blue-300">
                🎯 나만의 카드를 찾아보세요! 🎯
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {cardCategories.map((category, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl md:rounded-3xl ${category.color} ${category.shadow} shadow-xl hover:shadow-2xl transition-all duration-1000 transform hover:-translate-y-2 hover:scale-105 border-2 md:border-4 border-white cursor-pointer ${
                    visibleSections.has('category') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`
                  }}
                  onClick={() => router.push(category.link)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-4 md:p-8 text-center">
                    <div className="text-4xl md:text-6xl mb-2 md:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-white mb-1 md:mb-3 text-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-white/90 mb-4 md:mb-6 font-semibold text-sm md:text-lg">
                      {category.description}
                    </p>
                    <button className="bg-white text-gray-800 font-black px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg border-1 md:border-2 border-gray-800 transform hover:scale-105 text-sm md:text-base cursor-pointer">
                      START! →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 스크롤 힌트 */}
          <ScrollHint />
        </section>

        

        {/* CTA 섹션 - 닌텐도 게임 스타일 */}
        <section 
          ref={ctaRef}
          id="cta"
          className={`relative py-4 md:py-8 px-4 snap-start h-[calc(100dvh-65px)] mt-[65px] flex items-center transition-all duration-1000 ${
            visibleSections.has('cta') 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center w-full max-h-[calc(100dvh-65px-2rem)] overflow-hidden">
            <div className={`bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 rounded-2xl md:rounded-3xl p-6 md:p-12 border-2 md:border-4 border-gray-800 shadow-2xl transition-all duration-1000 delay-200 ${
              visibleSections.has('cta') 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-10 scale-95'
            }`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4 md:mb-6">
                🎮 게임 시작! 🎮
              </h2>
              <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 font-semibold px-2">
                ⭐ 포켓몬 카드 거래의 새로운 모험을 시작하세요! ⭐
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center transition-all duration-1000 delay-400 ${
                visibleSections.has('cta') 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-10'
              }`}>
                <button 
                  onClick={() => router.push('/pokemon-card-trade')}
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 md:px-10 py-3 md:py-5 rounded-full font-black text-sm md:text-lg hover:from-red-500 hover:to-pink-600 transition-all duration-300 shadow-xl border-2 md:border-4 border-white transform hover:scale-105 cursor-pointer">
                  🎯 카드 판매하기
                </button>
                <button 
                  onClick={() => router.push('/pokemon-card')}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 md:px-10 py-3 md:py-5 rounded-full font-black text-sm md:text-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 shadow-xl border-2 md:border-4 border-white transform hover:scale-105 cursor-pointer">
                  🔍 카드 둘러보기
                </button>
              </div>
            </div>
          </div>
          
          {/* 스크롤 힌트 */}
          <ScrollHint />
        </section>

        {/* 프로젝트 소개 섹션 - 게임보이 스타일 */}
        <section 
          ref={aboutRef}
          id="about"
          className={`relative py-4 md:py-8 px-4 snap-start h-[calc(100dvh-65px)] mt-[65px] flex items-center transition-all duration-1000 ${
            visibleSections.has('about') 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="max-w-6xl mx-auto w-full max-h-[calc(100dvh-65px-2rem)] overflow-y-auto">
            {/* 프로젝트 소개 헤더 */}
            <div className={`text-center mb-4 md:mb-8 transition-all duration-1000 delay-200 ${
              visibleSections.has('about') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-2 md:mb-3">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text">
                  🎯 POCAMARKET PROJECT 🎯
                </span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 font-semibold bg-purple-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full inline-block border-1 md:border-2 border-purple-300">
                🎮 포켓몬 카드 거래 플랫폼의 개발 스토리 🎮
              </p>
            </div>

            {/* 프로젝트 설명 카드 */}
            <div className={`relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-1000 delay-400 ${
              visibleSections.has('about') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-xl md:rounded-2xl"></div>
              <div className="relative text-center">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">🎮</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                  차세대 포켓몬 카드 거래 플랫폼
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                  Spring Boot와 Next.js를 활용한 풀스택 개발 프로젝트
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                  <span className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    Next.js
                  </span>
                  <span className="bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    Spring Boot
                  </span>
                  <span className="bg-purple-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    Docker
                  </span>
                  <span className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    AWS
                  </span>
                </div>
              </div>
            </div>

            {/* 링크 카드 그리드 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
              {projectFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl md:rounded-2xl ${feature.color} ${feature.shadow} shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:scale-105 border border-white/20 cursor-pointer ${
                    visibleSections.has('about') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`
                  }}
                  onClick={() => {
                    if (feature.link.startsWith('http')) {
                      window.open(feature.link, '_blank');
                    } else {
                      router.push(feature.link);
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-3 md:p-4 text-center">
                    <div className="text-2xl md:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-1 drop-shadow-lg">
                      {feature.name}
                    </h3>
                    <p className="text-white/90 mb-2 md:mb-3 font-medium text-xs md:text-sm">
                      {feature.description}
                    </p>
                    <button className="bg-white/90 text-gray-800 font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-white transition-colors shadow-md transform hover:scale-105 text-xs md:text-sm cursor-pointer">
                      바로가기 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 마지막 섹션이므로 스크롤 힌트 없음 */}
          <ScrollHint isLastSection={true} />
        </section>
      </div>

      {/* 맨위로 가기 버튼 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-500 group ${
          currentSection > 0 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6 mx-auto group-hover:animate-bounce" />
      </button>
    </div>
  )
}