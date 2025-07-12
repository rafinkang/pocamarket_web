"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Mail,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  MapPin,
  Zap,
  Target,
  Users,
  Rocket,
  Monitor,
  Server,
  Settings
} from "lucide-react"
import Link from "next/link"
import { PORTFOLIO, SWAGGER_UI } from "@/constants/path"

export default function AboutUsContainer() {
  const developers = [
    {
      id: 1,
      name: "강태욱",
      nickname: "Rafin",
      role: "Full Stack Developer",
      position: "Project Manager",
      experience: "8년차",
      location: "서울 금천구",
      introduction: "풀스택 개발 경험을 바탕으로 DevOps와 인프라 관리까지 다 했다. 뭐라고 써야되냐 이거 남사시럽구로",
      skills: {
        "Frontend": [
          { name: "JavaScript", level: "전문가" },
          { name: "JQuery", level: "전문가" },
          { name: "Svelte", level: "전문가" },
          { name: "React", level: "중급" },
          { name: "Next.js", level: "중급" },
          { name: "CSS/SCSS", level: "중급" },
          { name: "Tailwind CSS", level: "초급" },
        ],
        "Backend": [
          { name: "PHP", level: "전문가" },
          { name: "MySQL", level: "전문가" },
          { name: "Node.js", level: "중급" },
          { name: "Java", level: "중급" },
          { name: "Spring Boot", level: "중급" },
          { name: "Python", level: "중급" },
        ],
        "DevOps": [
          { name: "Git", level: "전문가" },
          { name: "Docker", level: "고급" },
          { name: "Docker Hub", level: "중급" },
          { name: "GitHub Actions", level: "중급" },
          { name: "AWS", level: "중급" },
          { name: "Nginx", level: "중급" },
        ],
        "Tools": [
          { name: "Notion" },
          { name: "Slack" },
          { name: "Figma" },
        ]
      },
      projects: [
        "프로젝트 관리",
        "Next.js 프론트엔드",
        "Spring Boot 백엔드",
        "Docker 컨테이너 관리",
        "AWS 인프라 관리",
        "GitHub Actions CI/CD",
        "MySQL 데이터베이스 관리",
        "Nginx 관리",
      ],
      contact: {
        email: "rkdxodnr07@gmail.com",
        github: "https://github.com/rafinkang"
      }
    },
    {
      id: 2,
      name: "박지연",
      nickname: "Ara",
      role: "Full Stack Developer",
      position: "Frontend Lead",
      experience: "7년차",
      location: "서울 금천구",
      introduction: "프론트엔드 개발을 주도하며, 재사용 가능한 공통 컴포넌트 설계를 통해 개발 효율성과 코드 품질을 높이는 것에 중점을 뒀습니다. RESTful API 설계 및 백엔드 개발에 참여하며, 프로젝트 전반적인 프로세스를 경험했습니다.",
      skills: {
        "Frontend": [
          { name: "JavaScript", level: "전문가" },
          { name: "Vue.js", level: "전문가" },
          { name: "CSS/SCSS", level: "고급" },
          { name: "Vuetify", level: "고급" },
          { name: "React", level: "중급" },
          { name: "Next.js", level: "중급" },
          { name: "Tailwind CSS", level: "초급" },
          { name: "AngularJS", level: "초급" },
        ],
        "Backend": [
          { name: "Java", level: "중급" },
          { name: "Spring Boot", level: "중급" },
          { name: "MySQL", level: "중급" },
          { name: "Python", level: "중급" },
        ],
        "DevOps": [
          { name: "Git", level: "전문가" },
          { name: "GitHub Actions", level: "중급" },
          { name: "Docker", level: "중급" },
          { name: "Docker Hub", level: "중급" },
          { name: "AWS", level: "초급" },
          { name: "Nginx", level: "초급" }
        ],
        "Tools": [
          { name: "Notion" },
          { name: "Discord" },
          { name: "Figma" },
        ]
      },
      projects: [
        "RESTful API 설계",
        "사용자 로그인 구현 및 정보 관리",
        "Next.js 구조 설계",
        "Next.js 공통 컴포넌트 관리",
        "Next.js proxy 구현 및 관리",
      ],
      contact: {
        email: "jypark2781@gmail.com",
        github: "https://github.com/wldus904"
      }
    },
    {
      id: 3,
      name: "윤유석",
      nickname: "Sayarn",
      role: "Full Stack Developer",
      position: "Backend Lead",
      experience: "4년차",
      location: "서울 금천구",
      introduction: `백엔드 풀스택 개발자입니다. 프로젝트에서 백엔드와 프론트엔드, 인프라까지 폭넓게 경험했습니다. 협업과 지속적인 성장에 가치를 두고 있습니다.`,
      skills: {
        "Frontend": [
          { name: "Next.js", level: "중급" },
          { name: "Tailwind CSS", level: "중급" },
          { name: "JQuery", level: "전문가" },
          { name: "Svelte", level: "전문가" },
        ],
        "Backend": [
          { name: "Java", level: "전문가" },
          { name: "Spring Boot", level: "전문가" },
          { name: "PHP", level: "전문가" },
          { name: "MariaDB", level: "고급" },
        ],
        "DevOps": [
          { name: "Git", level: "고급" },
          { name: "GitHub Actions", level: "중급" },
          { name: "Docker", level: "중급" },
          { name: "AWS", level: "중급" },
          { name: "Swagger", level: "중급" },
          { name: "Nginx", level: "중급" }
        ]
      },
      projects: [
        "포켓몬 카드 리스트 페이지 API 및 프론트엔드 구현",
        "카드 교환 리스트 페이지 API 및 프론트엔드 구현",
        "Spring Security 기반 인증/인가 및 네이버 OAuth2 로그인 연동",
        "JWT 기반 로그인 및 인증 토큰 발급",
        "카드 데이터 업로드 및 관리 기능 개발",
        "Swagger를 활용한 API 문서화",
        "AWS 환경에서의 서비스 배포 및 운영 경험"
      ],
      contact: {
        email: "yunys960@gmail.com",
        github: "https://github.com/yunyuseok"
      }
    }
  ];

  const getLevelBadge = (level) => {
    const levelConfig = {
      "입문": {
        badge: <Badge className="bg-gray-600 text-gray-200 border-2 border-gray-900 font-mono hover:bg-gray-600" style={{ boxShadow: '2px 2px 0px #000000' }}>입문</Badge>,
        color: "bg-gray-600 text-gray-200"
      },
      "초급": {
        badge: <Badge className="bg-blue-600 text-blue-100 border-2 border-blue-900 font-mono hover:bg-blue-600" style={{ boxShadow: '2px 2px 0px #000000' }}>초급</Badge>,
        color: "bg-blue-600 text-blue-100"
      },
      "중급": {
        badge: <Badge className="bg-yellow-500 text-yellow-900 border-2 border-yellow-700 font-mono hover:bg-yellow-500" style={{ boxShadow: '2px 2px 0px #000000' }}>중급</Badge>,
        color: "bg-yellow-500 text-yellow-900"
      },
      "고급": {
        badge: <Badge className="bg-red-600 text-red-100 border-2 border-red-900 font-mono hover:bg-red-600" style={{ boxShadow: '2px 2px 0px #000000' }}>고급</Badge>,
        color: "bg-red-600 text-red-100"
      },
      "전문가": {
        badge: <Badge className="bg-green-600 text-green-100 border-2 border-green-900 font-mono hover:bg-green-600" style={{ boxShadow: '2px 2px 0px #000000' }}>
          <Star className="h-3 w-3 mr-1" />전문가
        </Badge>,
        color: "bg-green-600 text-green-100"
      }
    };
    return levelConfig[level] || { badge: <Badge variant="outline">{level}</Badge>, color: "bg-gray-600 text-gray-200" };
  };



  const getCategoryIcon = (category) => {
    const icons = {
      "Frontend": <Monitor className="h-4 w-4" />,
      "Backend": <Server className="h-4 w-4" />,
      "DevOps": <Settings className="h-4 w-4" />,
      "기타": <Code className="h-4 w-4" />
    };
    return icons[category] || <Code className="h-4 w-4" />;
  };



  return (
    <div className="min-h-screen bg-gray-300" style={{
      backgroundImage: `
        radial-gradient(circle at 2px 2px, #374151 1px, transparent 0),
        radial-gradient(circle at 6px 6px, #6b7280 1px, transparent 0)
      `,
      backgroundSize: '8px 8px'
    }}>
      {/* 포카마켓 프로젝트 헤더 */}
      <div className="relative bg-gray-900 text-white overflow-hidden border-b-8 border-gray-700" style={{
        backgroundImage: `
          linear-gradient(45deg, #111827 25%, transparent 25%),
          linear-gradient(-45deg, #111827 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #111827 75%),
          linear-gradient(-45deg, transparent 75%, #111827 75%)
        `,
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
      }}>
        {/* 게임보이 도트 배경 패턴 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16 bg-gray-600 border-4 border-gray-700" style={{
            backgroundImage: 'linear-gradient(45deg, #4b5563 25%, transparent 25%), linear-gradient(-45deg, #4b5563 25%, transparent 25%)',
            backgroundSize: '4px 4px'
          }}></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-gray-600 border-4 border-gray-700" style={{
            backgroundImage: 'linear-gradient(45deg, #4b5563 25%, transparent 25%), linear-gradient(-45deg, #4b5563 25%, transparent 25%)',
            backgroundSize: '4px 4px'
          }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gray-600 border-4 border-gray-700" style={{
            backgroundImage: 'linear-gradient(45deg, #4b5563 25%, transparent 25%), linear-gradient(-45deg, #4b5563 25%, transparent 25%)',
            backgroundSize: '4px 4px'
          }}></div>
          <div className="absolute bottom-10 right-10 w-14 h-14 bg-gray-600 border-4 border-gray-700" style={{
            backgroundImage: 'linear-gradient(45deg, #4b5563 25%, transparent 25%), linear-gradient(-45deg, #4b5563 25%, transparent 25%)',
            backgroundSize: '4px 4px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* 게임보이 스타일 아이콘 */}
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gray-200 border-8 border-gray-800 shadow-2xl transform hover:scale-105 transition-transform" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <Rocket className="h-16 w-16 text-gray-900" />
              </div>
            </div>

            {/* 게임보이 스타일 타이틀 */}
            <div className="bg-gray-200 border-8 border-gray-800 p-8 mb-8 max-w-4xl mx-auto shadow-2xl" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 font-mono tracking-wider">
                POCAMARKET
              </h1>
              <div className="w-full h-2 bg-gray-800 mb-4"></div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-mono">
                POKEMON CARD TRADING PORTFOLIO
              </p>
              <p className="text-lg text-gray-600 mt-2 font-mono">
                ★ PRESS START TO HIRE ME ★
              </p>
            </div>

            {/* 게임보이 스타일 특징 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Link href={PORTFOLIO} target="_blank">
                <div className="bg-gray-200 border-8 border-gray-800 p-6 transform hover:scale-105 transition-transform shadow-lg" style={{
                  boxShadow: '4px 4px 0px #000000, 8px 8px 0px #374151'
                }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 bg-gray-800 border-4 border-gray-900">
                      <Target className="h-8 w-8 text-gray-200" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 font-mono">PORTFOLIO</h3>
                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    프로젝트 포트폴리오 보러가기
                  </p>
                </div>
              </Link>
              <Link href={SWAGGER_UI} target="_blank">
                <div className="bg-gray-200 border-8 border-gray-800 p-6 transform hover:scale-105 transition-transform shadow-lg" style={{
                  boxShadow: '4px 4px 0px #000000, 8px 8px 0px #374151'
                }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 bg-gray-800 border-4 border-gray-900">
                      <Zap className="h-8 w-8 text-gray-200" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 font-mono">SWAGGER UI</h3>
                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    API 문서화 보러가기
                  </p>
                </div>
              </Link>

              <Link href="#devteam">
                <div className="bg-gray-200 border-8 border-gray-800 p-6 transform hover:scale-105 transition-transform shadow-lg" style={{
                  boxShadow: '4px 4px 0px #000000, 8px 8px 0px #374151'
                }}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 bg-gray-800 border-4 border-gray-900">
                      <Users className="h-8 w-8 text-gray-200" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 font-mono">TEAM WORK</h3>
                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    팀 프로젝트 개발자들 구직중
                  </p>
                </div>
              </Link>
            </div>


            {/* 게임보이 스타일 배지들 */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://github.com/rafinkang/pocamarket_infra" target="_blank">
                <div className="flex items-center bg-gray-200 text-gray-900 px-6 py-3 border-4 border-gray-800 font-bold font-mono text-sm shadow-lg" style={{
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  <Github className="h-4 w-4 mr-2" />Docker
                </div>
              </Link>
              <Link href="https://github.com/rafinkang/pocamarket_api" target="_blank">
                <div className="flex items-center bg-gray-200 text-gray-900 px-6 py-3 border-4 border-gray-800 font-bold font-mono text-sm shadow-lg" style={{
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  <Github className="h-4 w-4 mr-2" />Spring Boot
                </div>
              </Link>
              <Link href="https://github.com/rafinkang/pocamarket_web" target="_blank">
                <div className="flex items-center bg-gray-200 text-gray-900 px-6 py-3 border-4 border-gray-800 font-bold font-mono text-sm shadow-lg" style={{
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  <Github className="h-4 w-4 mr-2" />Next.js
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 개발팀 소개 */}
      <div className="py-20 bg-gray-300" id="devteam" style={{
        backgroundImage: `
          radial-gradient(circle at 2px 2px, #374151 1px, transparent 0),
          radial-gradient(circle at 6px 6px, #6b7280 1px, transparent 0)
        `,
        backgroundSize: '8px 8px'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 팀 소개 헤더 */}
          <div className="text-center mb-16">
            <div className="bg-gray-200 border-8 border-gray-800 p-6 max-w-2xl mx-auto mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">
                🎯 DEVELOPMENT TEAM
              </h2>
            </div>
            {/* <p className="text-xl text-gray-800 max-w-3xl mx-auto font-mono bg-gray-200 border-4 border-gray-700 p-4" style={{
              boxShadow: '4px 4px 0px #000000'
            }}>
              각각의 전문성과 경험을 바탕으로 사용자 중심의<br />
              서비스를 만들어 나가는 개발자들을 소개합니다.
            </p> */}
          </div>

          {/* 개발자 카드 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {developers.map((developer) => (
              <Card key={developer.id} className="hover:shadow-xl transition-all duration-300 border-8 pt-0 border-gray-800 bg-gray-200 gap-0" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <CardHeader className="pb-4 bg-gray-900 border-b-8 border-gray-800 pt-6">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white font-mono">
                      {developer.name}<span className="text-gray-200 font-mono text-lg ml-2">{developer.nickname}</span>
                    </CardTitle>
                    {/* <CardDescription className="text-gray-100 font-mono text-lg">
                      {developer.nickname}
                    </CardDescription> */}
                    <CardDescription className="text-gray-200 font-mono">
                      {developer.position}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  {/* 기본 정보 */}
                  <div className="bg-gray-300 border-4 border-gray-700 p-4" style={{
                    boxShadow: '2px 2px 0px #000000'
                  }}>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-900 font-mono">
                        <Briefcase className="h-5 w-5 mr-2" />
                        <span className="font-bold">경력: {developer.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-900 font-mono">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="font-bold">지역: {developer.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* 소개 */}
                  <div className="bg-gray-300 border-4 border-gray-700 p-4" style={{
                    boxShadow: '2px 2px 0px #000000'
                  }}>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center font-mono text-lg">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      PROFILE
                    </h4>
                    <p className="text-gray-800 leading-relaxed font-mono text-sm">
                      {developer.introduction}
                    </p>
                  </div>

                  {/* 주요 프로젝트 */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center font-mono text-lg">
                      <Star className="h-5 w-5 mr-2" />
                      ROLE
                    </h4>
                    <div className="bg-gray-300 border-4 border-gray-700 p-4" style={{
                      boxShadow: '2px 2px 0px #000000'
                    }}>
                      <ul className="space-y-2">
                        {developer.projects.map((project, index) => (
                          <li key={index} className="text-gray-800 flex items-start font-mono text-sm">
                            <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0" style={{
                              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                            }}></span>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 기술 스택 */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center font-mono text-lg">
                      <Code className="h-5 w-5 mr-2" />
                      TECH STACK
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(developer.skills).map(([category, skills]) => (
                        <div key={category} className="border-4 border-gray-700 p-4 bg-gray-300" style={{
                          boxShadow: '2px 2px 0px #000000'
                        }}>
                          <h5 className="font-bold text-gray-900 mb-3 flex items-center font-mono">
                            {getCategoryIcon(category)}
                            <span className="ml-2">{category}</span>
                          </h5>
                          <div className="space-y-2">
                            {skills.map((skill, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <Badge className="bg-gray-700 text-gray-200 border-2 border-gray-900 font-mono hover:bg-gray-700" style={{ boxShadow: '2px 2px 0px #000000' }}>
                                  {skill.name}
                                </Badge>
                                {getLevelBadge(skill.level).badge}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  

                  {/* 연락처 */}
                  <div className="pt-4 border-t-4 border-gray-700">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-4 border-gray-800 bg-gray-200 text-gray-900 hover:bg-gray-300 font-mono font-bold"
                        style={{
                          boxShadow: '2px 2px 0px #000000'
                        }}
                        onClick={() => window.open(`mailto:${developer.contact.email}`, '_blank')}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        EMAIL
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-4 border-gray-800 bg-gray-200 text-gray-900 hover:bg-gray-300 font-mono font-bold"
                        style={{
                          boxShadow: '2px 2px 0px #000000'
                        }}
                        onClick={() => window.open(developer.contact.github, '_blank')}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GITHUB
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}