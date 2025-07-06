"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Database, 
  Server, 
  Settings, 
  GitBranch,
  Layers,
  Monitor,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Package,
  Terminal,
  FileText,
  Archive,
  Cpu,
  HardDrive,
  Network,
  Container,
  Cloud,
  Lock,
  RefreshCw,
  Users,
  BarChart3,
  Workflow
} from "lucide-react"

export default function PortfolioContainer() {
  const techStack = {
    "Frontend": [
      { name: "Next.js 14", description: "React 기반 풀스택 프레임워크", level: "전문가" },
      { name: "React 18", description: "컴포넌트 기반 UI 라이브러리", level: "전문가" },
      { name: "TypeScript", description: "정적 타입 체크", level: "고급" },
      { name: "Tailwind CSS", description: "유틸리티 기반 CSS 프레임워크", level: "고급" },
      { name: "Shadcn/ui", description: "재사용 가능한 컴포넌트 라이브러리", level: "고급" }
    ],
    "Backend": [
      { name: "Next.js API Routes", description: "서버사이드 API 엔드포인트", level: "고급" },
      { name: "Prisma ORM", description: "타입 안전한 데이터베이스 클라이언트", level: "고급" },
      { name: "MySQL", description: "관계형 데이터베이스", level: "전문가" },
      { name: "Node.js", description: "JavaScript 런타임", level: "고급" }
    ],
    "DevOps": [
      { name: "Docker", description: "컨테이너화 플랫폼", level: "고급" },
      { name: "GitHub Actions", description: "CI/CD 자동화", level: "중급" },
      { name: "Nginx", description: "웹 서버 및 리버스 프록시", level: "중급" },
      { name: "AWS", description: "클라우드 인프라", level: "중급" }
    ],
    "도구": [
      { name: "Git", description: "버전 관리 시스템", level: "전문가" },
      { name: "VS Code", description: "통합 개발 환경", level: "전문가" },
      { name: "Figma", description: "UI/UX 디자인 도구", level: "중급" },
      { name: "Notion", description: "프로젝트 관리", level: "고급" }
    ]
  }

  const projectStructure = [
    {
      name: "src/app/",
      type: "폴더",
      description: "Next.js 13+ App Router 구조",
      children: [
        { name: "page.js", type: "파일", description: "메인 페이지 컴포넌트" },
        { name: "layout.js", type: "파일", description: "전체 레이아웃 컴포넌트" },
        { name: "about-us/", type: "폴더", description: "팀 소개 페이지" },
        { name: "portfolio/", type: "폴더", description: "포트폴리오 페이지" },
        { name: "api/", type: "폴더", description: "API 라우트" }
      ]
    },
    {
      name: "src/components/",
      type: "폴더", 
      description: "재사용 가능한 UI 컴포넌트",
      children: [
        { name: "ui/", type: "폴더", description: "Shadcn/ui 컴포넌트" },
        { name: "layout/", type: "폴더", description: "레이아웃 컴포넌트" }
      ]
    },
    {
      name: "prisma/",
      type: "폴더",
      description: "데이터베이스 스키마 및 설정",
      children: [
        { name: "schema.prisma", type: "파일", description: "데이터베이스 스키마 정의" },
        { name: "seed.js", type: "파일", description: "초기 데이터 시드" }
      ]
    }
  ]

  const features = [
    {
      title: "사용자 인증 시스템",
      description: "JWT 기반 인증 및 권한 관리",
      icon: <Shield className="h-6 w-6" />,
      details: [
        "회원가입 및 로그인 기능",
        "JWT 토큰 기반 인증",
        "역할 기반 접근 제어",
        "소셜 로그인 연동"
      ]
    },
    {
      title: "포켓몬 카드 거래 시스템",
      description: "실시간 카드 거래 및 관리",
      icon: <Package className="h-6 w-6" />,
      details: [
        "카드 등록 및 관리",
        "실시간 거래 시스템",
        "가격 추천 알고리즘",
        "거래 내역 관리"
      ]
    },
    {
      title: "실시간 알림 시스템",
      description: "WebSocket 기반 실시간 통신",
      icon: <Zap className="h-6 w-6" />,
      details: [
        "거래 알림",
        "가격 변동 알림",
        "시스템 공지사항",
        "실시간 채팅"
      ]
    },
    {
      title: "관리자 대시보드",
      description: "시스템 모니터링 및 관리",
      icon: <BarChart3 className="h-6 w-6" />,
      details: [
        "사용자 관리",
        "거래 통계",
        "시스템 모니터링",
        "컨텐츠 관리"
      ]
    }
  ]

  const getLevelBadge = (level) => {
    const levelConfig = {
      "입문": { 
        badge: <Badge className="bg-gray-600 text-gray-200 border-2 border-gray-900 font-mono hover:bg-gray-600" style={{boxShadow: '2px 2px 0px #000000'}}>입문</Badge>
      },
      "초급": { 
        badge: <Badge className="bg-blue-600 text-blue-100 border-2 border-blue-900 font-mono hover:bg-blue-600" style={{boxShadow: '2px 2px 0px #000000'}}>초급</Badge>
      },
      "중급": { 
        badge: <Badge className="bg-yellow-500 text-yellow-900 border-2 border-yellow-700 font-mono hover:bg-yellow-500" style={{boxShadow: '2px 2px 0px #000000'}}>중급</Badge>
      },
      "고급": { 
        badge: <Badge className="bg-red-600 text-red-100 border-2 border-red-900 font-mono hover:bg-red-600" style={{boxShadow: '2px 2px 0px #000000'}}>고급</Badge>
      },
      "전문가": { 
        badge: <Badge className="bg-green-600 text-green-100 border-2 border-green-900 font-mono hover:bg-green-600" style={{boxShadow: '2px 2px 0px #000000'}}>전문가</Badge>
      }
    };
    return levelConfig[level] || { badge: <Badge variant="outline">{level}</Badge> };
  };

  return (
    <div className="min-h-screen bg-gray-300" style={{ 
      backgroundImage: `
        radial-gradient(circle at 2px 2px, #374151 1px, transparent 0),
        radial-gradient(circle at 6px 6px, #6b7280 1px, transparent 0)
      `,
      backgroundSize: '8px 8px'
    }}>
      {/* 헤더 */}
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gray-200 border-8 border-gray-800 shadow-2xl transform hover:scale-105 transition-transform" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <Code className="h-16 w-16 text-gray-900" />
              </div>
            </div>
            
            <div className="bg-gray-200 border-8 border-gray-800 p-8 mb-8 max-w-4xl mx-auto shadow-2xl" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 font-mono tracking-wider">
                PORTFOLIO
              </h1>
              <div className="w-full h-2 bg-gray-800 mb-4"></div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-mono">
                POCAMARKET TECHNICAL DOCUMENTATION
              </p>
              <p className="text-lg text-gray-600 mt-2 font-mono">
                ★ DEVELOPMENT ARCHITECTURE & STACK ★
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="py-20 bg-gray-300" style={{ 
        backgroundImage: `
          radial-gradient(circle at 2px 2px, #374151 1px, transparent 0),
          radial-gradient(circle at 6px 6px, #6b7280 1px, transparent 0)
        `,
        backgroundSize: '8px 8px'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 프로젝트 개요 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Monitor className="h-8 w-8 mr-4" />
                🎮 PROJECT OVERVIEW
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                  <CardTitle className="text-white font-mono">📋 PROJECT INFO</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-300 border-4 border-gray-700 p-4 font-mono" style={{boxShadow: '2px 2px 0px #000000'}}>
                      <strong>NAME:</strong> 포카마켓 (POCAMARKET)
                    </div>
                    <div className="bg-gray-300 border-4 border-gray-700 p-4 font-mono" style={{boxShadow: '2px 2px 0px #000000'}}>
                      <strong>TYPE:</strong> 포켓몬 카드 거래 플랫폼
                    </div>
                    <div className="bg-gray-300 border-4 border-gray-700 p-4 font-mono" style={{boxShadow: '2px 2px 0px #000000'}}>
                      <strong>TEAM:</strong> 3명 (Full Stack)
                    </div>
                    <div className="bg-gray-300 border-4 border-gray-700 p-4 font-mono" style={{boxShadow: '2px 2px 0px #000000'}}>
                      <strong>PERIOD:</strong> 2024.01 - 2024.03
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                  <CardTitle className="text-white font-mono">🎯 MAIN FEATURES</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2 font-mono text-sm">
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0"></span>
                      포켓몬 카드 등록 및 관리
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0"></span>
                      실시간 거래 시스템
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0"></span>
                      사용자 인증 및 권한 관리
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0"></span>
                      관리자 대시보드
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0"></span>
                      반응형 웹 디자인
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 기술 스택 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Layers className="h-8 w-8 mr-4" />
                ⚙️ TECH STACK
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(techStack).map(([category, technologies]) => (
                <Card key={category} className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
                  boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
                }}>
                  <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                    <CardTitle className="text-white font-mono">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {technologies.map((tech, index) => (
                        <div key={index} className="bg-gray-300 border-4 border-gray-700 p-4" style={{
                          boxShadow: '2px 2px 0px #000000'
                        }}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900 font-mono">{tech.name}</h4>
                            {getLevelBadge(tech.level).badge}
                          </div>
                          <p className="text-gray-800 text-sm font-mono">{tech.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 시스템 아키텍처 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Network className="h-8 w-8 mr-4" />
                🏗️ SYSTEM ARCHITECTURE
              </h2>
            </div>
            
            <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                <CardTitle className="text-white font-mono">시스템 구조도</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-900 border-4 border-gray-700 p-6 font-mono text-green-400 text-sm overflow-x-auto" style={{
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  <pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                           CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   React     │  │ Tailwind    │  │  Shadcn/ui  │            │
│  │ Components  │  │    CSS      │  │ Components  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   Next.js 14 App Router                    ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP/HTTPS
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                          SERVER SIDE                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  Next.js API Routes                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                                  │                              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Prisma ORM                              ││
│  └─────────────────────────────────────────────────────────────┘│
│                                  │                              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     MySQL Database                         ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Docker
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Docker    │  │    Nginx    │  │     AWS     │            │
│  │ Container   │  │ Reverse     │  │   Cloud     │            │
│  │             │  │   Proxy     │  │             │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 데이터베이스 구조 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Database className="h-8 w-8 mr-4" />
                🗄️ DATABASE STRUCTURE
              </h2>
            </div>
            
            <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                <CardTitle className="text-white font-mono">Prisma Schema</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-900 border-4 border-gray-700 p-6 font-mono text-blue-400 text-sm overflow-x-auto" style={{
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  <pre>{`
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  cards     Card[]
  orders    Order[]
  
  @@map("users")
}

model Card {
  id          String   @id @default(cuid())
  name        String
  series      String
  rarity      String
  condition   String
  price       Float
  description String?
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  orderItems  OrderItem[]
  
  @@map("cards")
}

model Order {
  id          String      @id @default(cuid())
  status      OrderStatus @default(PENDING)
  totalPrice  Float
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  orderItems  OrderItem[]
  
  @@map("orders")
}

model OrderItem {
  id       String @id @default(cuid())
  quantity Int
  price    Float
  
  orderId  String
  order    Order  @relation(fields: [orderId], references: [id])
  cardId   String
  card     Card   @relation(fields: [cardId], references: [id])
  
  @@map("order_items")
}

enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 프로젝트 구조 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <FileText className="h-8 w-8 mr-4" />
                📁 PROJECT STRUCTURE
              </h2>
            </div>
            
            <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                <CardTitle className="text-white font-mono">폴더 구조</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {projectStructure.map((item, index) => (
                    <div key={index} className="bg-gray-300 border-4 border-gray-700 p-4" style={{
                      boxShadow: '2px 2px 0px #000000'
                    }}>
                      <div className="flex items-center mb-2">
                        <Archive className="h-4 w-4 mr-2 text-gray-900" />
                        <span className="font-bold text-gray-900 font-mono">{item.name}</span>
                        <Badge className="ml-2 bg-gray-600 text-gray-200 font-mono">{item.type}</Badge>
                      </div>
                      <p className="text-gray-800 text-sm font-mono mb-2">{item.description}</p>
                      {item.children && (
                        <div className="ml-4 space-y-1">
                          {item.children.map((child, childIndex) => (
                            <div key={childIndex} className="flex items-center text-sm font-mono">
                              <span className="w-2 h-2 bg-gray-900 mr-2"></span>
                              <span className="text-gray-700">{child.name}</span>
                              <span className="ml-2 text-gray-600">- {child.description}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 주요 기능 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Settings className="h-8 w-8 mr-4" />
                🔧 KEY FEATURES
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
                  boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
                }}>
                  <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                    <CardTitle className="text-white font-mono flex items-center">
                      <span className="text-white mr-2">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-800 mb-4 font-mono text-sm">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start font-mono text-sm">
                          <span className="w-3 h-3 bg-gray-900 mt-1.5 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 개발 환경 설정 */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Terminal className="h-8 w-8 mr-4" />
                💻 DEVELOPMENT SETUP
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                  <CardTitle className="text-white font-mono">설치 및 실행</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-900 border-4 border-gray-700 p-4 font-mono text-green-400 text-sm" style={{
                    boxShadow: '2px 2px 0px #000000'
                  }}>
                    <pre>{`
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 데이터베이스 시드
npx prisma db seed
                    `}</pre>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
                boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
              }}>
                <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                  <CardTitle className="text-white font-mono">환경 변수</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-900 border-4 border-gray-700 p-4 font-mono text-yellow-400 text-sm" style={{
                    boxShadow: '2px 2px 0px #000000'
                  }}>
                    <pre>{`
# .env.local
DATABASE_URL="mysql://username:password@localhost:3306/pocamarket"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
JWT_SECRET="your-jwt-secret"

# .env.production
DATABASE_URL="mysql://username:password@production-db:3306/pocamarket"
NEXTAUTH_URL="https://pocamarket.com"
NEXTAUTH_SECRET="production-secret"
JWT_SECRET="production-jwt-secret"
                    `}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 배포 및 DevOps */}
          <section>
            <div className="bg-gray-200 border-8 border-gray-800 p-6 mb-8" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <h2 className="text-3xl font-bold text-gray-900 font-mono flex items-center">
                <Cloud className="h-8 w-8 mr-4" />
                🚀 DEPLOYMENT & DEVOPS
              </h2>
            </div>
            
            <Card className="border-8 border-gray-800 bg-gray-200 pt-0" style={{
              boxShadow: '8px 8px 0px #000000, 16px 16px 0px #374151'
            }}>
              <CardHeader className="bg-gray-900 border-b-8 border-gray-800 pt-6">
                <CardTitle className="text-white font-mono">Docker 설정</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-900 border-4 border-gray-700 p-4 font-mono text-blue-400 text-sm overflow-x-auto" style={{
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  <pre>{`
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci --only=production

# 소스 복사
COPY . .

# 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 실행
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:password@db:3306/pocamarket
    depends_on:
      - db
      
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=pocamarket
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      
volumes:
  db_data:
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}