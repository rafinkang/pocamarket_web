"use client";

import useAuthStore from "@/store/authStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlertDialog from "@/components/dialog/AlertDialog";
import ButtonGroup from "./ButtonGroup";
import TradeBox from "./TradeBox";
import TradeList from "./TradeList";

import { getTcgTradeDetail } from "@/api/tcgTrade";
import { LOGIN } from "@/constants/path";

export default function TradePageClient() {

  const router = useRouter();
  const { tradeId } = useParams();

  const [data, setData] = useState(null);
  const [isMy, setIsMy] = useState(false);
  const [alertTitle, setAlertTitle] = useState('로그인이 필요해요.');
  const [alertMsg, setAlertMsg] = useState('로그인 후 카드를 교환해보세요.');
  const [backRouter, setBackRouter] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);

  const handleOk = () => {
    if (backRouter) {
      router.back();
    }
    else {

      router.push(LOGIN);
    }
  }

  const getDetail = async () => {
    try {
      const response = await getTcgTradeDetail(tradeId);
      setData(response.data);
      setIsMy(response.data.isMy);
    } catch (error) {
      console.log(error);
      setAlertTitle("");
      setAlertMsg("잘못된 접근입니다.");
      setBackRouter(true);
      setShowAlert(true);
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // store에서 로그인 상태를 가져오기 전에 실행되지 않도록 isMounted추가
    if (!isMounted) return
    if (isLogin) getDetail();
    else setShowAlert(true);
  }, [isLogin, isMounted])

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <AlertDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        preventCloseOnOutsideClick={true}
        handleOk={handleOk}
        isConfrim={false}
        title={alertTitle}
        msg={alertMsg}
      />
      {isLogin && (
        <>
          <TradeBox data={data} isMy={isMy} />
          {isMy && <ButtonGroup tradeId={tradeId} />}
          <TradeList isMy={isMy} />
        </>
      )}
    </div>
  );
}