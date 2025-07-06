"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { User, Shield, TrendingUp, Package, FileText } from "lucide-react"
import MyInfoPage from "./MyInfo"
import TcgCode from "./TcgCode"
import MyReport from "./MyReport"
import MyTrade from "./MyTrade"

export default function MyPageContainer() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            마이페이지
          </h1>
          <p className="text-gray-600 text-lg">
            포켓몬 카드 거래 및 계정 정보를 관리하세요
          </p>
        </div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 왼쪽 컬럼 - 사용자 정보 및 통계 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 사용자 정보 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <MyInfoPage className="border-0 shadow-none bg-transparent" />
            </div>


          </div>

          {/* 오른쪽 컬럼 - 통계 및 빠른 액션 */}
          <div className="lg:col-span-4 space-y-6">
            {/* 거래 통계 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <MyTrade className="border-0 shadow-none bg-transparent" />
            </div>
          </div>
        </div>

        {/* 하단 섹션 - 관리 도구들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TCG 코드 관리 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <TcgCode className="border-0 shadow-none bg-transparent" />
          </div>

          {/* 신고 내역 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <MyReport className="border-0 shadow-none bg-transparent" />
          </div>
        </div>

        {/* 나의 덱 섹션 */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">나의 덱</CardTitle>
                <CardDescription className="text-gray-600">
                  나만의 포켓몬 카드 덱을 관리하세요
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 space-y-4">
              <Package className="h-16 w-16 text-gray-300 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">덱 기능 준비중</h3>
                <p className="text-gray-500">
                  곧 나만의 포켓몬 카드 덱을 만들고 관리할 수 있습니다!
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                <span className="animate-pulse">🚀 Coming Soon</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 빠른 액션 섹션 */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-gray-900">빠른 액션</CardTitle>
            <CardDescription className="text-center text-gray-600">
              자주 사용하는 기능들에 빠르게 접근하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">카드 조회</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">카드 거래</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">보안 설정</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">고객지원</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
