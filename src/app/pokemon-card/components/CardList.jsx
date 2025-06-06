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

export default function CardList({ cardList, CardComponent }) {
  return (
    <>
      <div className="flex items-center justify-center flex-col w-screen h-screen">
        <h1>Card List</h1>
        <h3>아래는 테스트용 버튼들이다.</h3>
        <Button className="mt-1" onClick={handleFetchMyInfo}>
          내정보 호출
        </Button>
        <Button className="mt-1" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <h1>Card List</h1>
        <ul>
          {cardList.map((card) => (
            <li key={card.code}>
              {CardComponent && <CardComponent data={card} />}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
