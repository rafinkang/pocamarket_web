/**
 * 개인정보처리방침 페이지 컴포넌트
 * 포트폴리오 용도로 개인정보 수집 및 이용에 대한 방침을 명시
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
          <p className="text-gray-600">
            포카마켓은 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
          </p>
        </div>

        {/* 중요 공지사항 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">⚠️ 중요 공지</h2>
          <p className="text-blue-800 leading-relaxed">
            본 웹사이트는 <strong>포트폴리오 및 기술 시연 목적</strong>으로만 제작되었으며, 
            상업적 목적으로 운영되지 않습니다. <br/>실제 거래나 결제 기능은 제공하지 않으며, 
            모든 데이터는 개발 및 시연 용도로만 사용됩니다.
          </p>
        </div>

        {/* 개인정보처리방침 내용 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          
          {/* 1. 개인정보 수집 및 이용 목적 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보 수집 및 이용 목적</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <h3 className="font-medium text-gray-900">회원 관리</h3>
                <p className="text-sm ml-4">• 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정이용 방지</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">서비스 제공</h3>
                <p className="text-sm ml-4">• 포트폴리오 기능 시연, 맞춤형 서비스 제공, 서비스 개선 및 신규 서비스 개발</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">기술 개발 및 시연</h3>
                <p className="text-sm ml-4">• 웹 개발 기술 시연, 사용자 경험 개선을 위한 데이터 분석 (포트폴리오 목적)</p>
              </div>
            </div>
          </section>

          {/* 2. 수집하는 개인정보 항목 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-medium text-gray-900">필수 수집 항목</h3>
                <ul className="text-sm ml-4 mt-2 space-y-1">
                  <li>• 소셜 로그인 정보 (구글, 네이버): 계정식별자, 이메일, 닉네임, 프로필 이미지</li>
                  <li>• 서비스 이용 기록: 접속 로그, 이용 시간, 서비스 이용 기록</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">자동 수집 항목</h3>
                <ul className="text-sm ml-4 mt-2 space-y-1">
                  <li>• 기술적 정보: IP 주소, 쿠키, 브라우저 정보, 접속 기록</li>
                  <li>• 서비스 이용 분석을 위한 익명화된 통계 정보</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 개인정보 보유 및 이용 기간 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보 보유 및 이용 기간</h2>
            <div className="text-gray-700">
              <p className="mb-3">회원 탈퇴 시 개인정보는 즉시 파기됩니다.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">예외 사항</h3>
                <ul className="text-sm space-y-1">
                  <li>• 관련 법령에 따라 보존이 필요한 경우: 해당 법령에서 정한 기간</li>
                  <li>• 포트폴리오 시연 목적: 사용자 동의 하에 필요한 최소 기간</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. 개인정보 제공 및 위탁 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보 제공 및 위탁</h2>
            <div className="text-gray-700">
              <p className="mb-3">원칙적으로 개인정보를 제3자에게 제공하지 않습니다.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">위탁 업무</h3>
                <ul className="text-sm space-y-1">
                  <li>• 소셜 로그인 서비스: Google, Naver (인증 목적)</li>
                  <li>• 클라우드 서비스: AWS (호스팅 목적)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. 개인정보 파기 절차 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보 파기 절차</h2>
            <div className="text-gray-700">
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900">파기 절차</h3>
                  <p className="text-sm ml-4">이용자가 회원탈퇴 등을 위해 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 보관됩니다.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">파기 방법</h3>
                  <ul className="text-sm ml-4 space-y-1">
                    <li>• 전자적 파일: 기록을 재생할 수 없는 기술적 방법으로 삭제</li>
                    <li>• 종이 문서: 분쇄기로 분쇄하거나 소각</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 6. 개인정보 보안 조치 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보 보안 조치</h2>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">기술적 보안 조치</h3>
                  <ul className="text-sm space-y-1">
                    <li>• HTTPS 통신 암호화</li>
                    <li>• 개인정보 암호화 저장</li>
                    <li>• 접근 권한 관리</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">관리적 보안 조치</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 개인정보 취급 직원 최소화</li>
                    <li>• 정기적인 보안 교육</li>
                    <li>• 개인정보 보호 정책 수립</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 7. 개인정보 보호 책임자 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보 보호 책임자</h2>
            <div className="text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">개인정보 보호 책임자</h3>
                <ul className="text-sm space-y-1">
                  <li>• 성명: 포카마켓 개발자</li>
                  <li>• 직책: 개인정보 보호 책임자</li>
                  <li>• 연락처: 개인정보 관련 문의사항이 있으시면 GitHub 이슈로 문의해 주세요.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. 기타 사항 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 기타 사항</h2>
            <div className="text-gray-700 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">개인정보 처리방침 변경</h3>
                <p className="text-sm ml-4">개인정보 처리방침이 변경될 경우 웹사이트 공지사항을 통해 공지합니다.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">포트폴리오 용도 안내</h3>
                <p className="text-sm ml-4">
                  본 사이트는 개발자의 기술 역량을 보여주는 포트폴리오 목적으로 제작되었습니다. 
                  실제 상업적 서비스가 아니며, 모든 기능은 시연 목적으로만 사용됩니다.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 시행일자 */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">
            본 개인정보처리방침은 2025년 7월 12일부터 시행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}