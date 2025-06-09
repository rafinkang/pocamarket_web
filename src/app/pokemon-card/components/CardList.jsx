"use client";

import { Button } from "@/components/ui/button";
import { getMyInfo } from "@/api/users";
import { logout } from "@/api/login";

async function handleFetchMyInfo() {
  const res = await getMyInfo();
  console.log(res);
}

async function handleLogout() {
  const res = await logout();
  console.log(res);
}

export default function CardList({ cardList, CardComponent, totalCount }) {
  return (
    <>
      {/* <div className="flex items-center justify-center flex-col w-screen h-screen">
        <h1>Card List</h1>
        <h3>아래는 테스트용 버튼들이다.</h3>
        <Button className="mt-1" onClick={handleFetchMyInfo}>
          내정보 호출
        </Button>
        <Button className="mt-1" onClick={handleLogout}>
          로그아웃
        </Button>  max-w-[300px]
      </div> */}

      <div className="flex flex-col items-center w-full">
        <h1>Card List</h1>
        <div>
          <span>
            총 {totalCount ? totalCount : 0}개의 카드가 검색되었습니다.
          </span>
        </div>
        <div className="contentList w-full px-[20px]">
          <ul className="grid items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cardList.map((card, index) => (
              <li
                className="flex items-center justify-center w-full max-w-[300px]"
                key={card.code}
              >
                {CardComponent && (
                  <CardComponent data={card} priority={index < 15} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
