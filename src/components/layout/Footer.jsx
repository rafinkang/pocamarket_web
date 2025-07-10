import Image from "next/image";
import { Github, Mail, Code, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  const developers = [
    { 
      name: "Rafin", 
      fullName: "강태욱",
      role: "Project Manager", 
      github: "https://github.com/rafinkang",
      email: "rkdxodnr07@gmail.com"
    },
    { 
      name: "Ariel", 
      fullName: "박지연",
      role: "Frontend Lead", 
      github: "https://github.com/developer2",
      email: "developer2@example.com"
    },
    { 
      name: "Sayarn", 
      fullName: "윤유석",
      role: "Backend Lead", 
      github: "https://github.com/yunyuseok",
      email: "yunys960@gmail.com"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden mt-4">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* 프로젝트 정보 */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Code className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  POCAMARKET
                </h3>
                <p className="text-gray-400 text-sm font-medium">Portfolio Project 2025</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              포켓몬 카드 거래 플랫폼을 통해 현대적인 웹 개발 기술을 경험하고<br className="hidden md:block" />
              팀워크와 협업의 가치를 실현한 포트폴리오 프로젝트입니다.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                Next.js
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30">
                Spring Boot
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                Docker
              </span>
              <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30">
                AWS
              </span>
            </div>
          </div>

          {/* 개발팀 정보 */}
          <div>
            <h4 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              💻 Development Team
            </h4>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {developers.map((dev, index) => (
                <div key={index} className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {dev.name.charAt(0)}
                    </div>
                    <h5 className="font-bold text-white text-sm mb-1">{dev.name}</h5>
                    <p className="text-gray-400 text-xs mb-1">{dev.fullName}</p>
                    <p className="text-gray-500 text-xs mb-3">{dev.role}</p>
                    
                    <div className="flex justify-center space-x-2">
                      <a 
                        href={dev.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                      >
                        <Github className="h-3 w-3 text-gray-300 hover:text-white" />
                      </a>
                      <a 
                        href={`mailto:${dev.email}`}
                        className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                      >
                        <Mail className="h-3 w-3 text-gray-300 hover:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 카피라이트 */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-2 text-red-400 fill-current" />
              <span>by RAS Team</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a 
                href="/about-us" 
                className="hover:text-white transition-colors duration-200 flex items-center"
              >
                About Us
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <a 
                href="/portfolio" 
                className="hover:text-white transition-colors duration-200 flex items-center"
              >
                Portfolio
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <span className="text-gray-500">© 2025 POCAMARKET</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}