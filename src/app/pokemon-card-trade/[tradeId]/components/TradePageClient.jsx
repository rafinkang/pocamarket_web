"use client";

import useAuthStore from "@/store/authStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlertDialog from "@/components/dialog/AlertDialog";
import TradeHeader from "./TradeHeader";
import ButtonGroup from "./ButtonGroup";
import TradeBox from "./TradeBox";
import TradeList from "./TradeList";

import { getTcgCodeList } from "@/api/tcgCode";
import { getTcgTradeDetail, postTcgTradeRequest } from "@/api/tcgTrade";
import { LOGIN } from "@/constants/path";

export default function TradePageClient() {

  const router = useRouter();
  const { tradeId } = useParams();

  const [data, setData] = useState(null);
  const [isMy, setIsMy] = useState(false);
  const [tcgCodeList, setTcgCodeList] = useState([]);
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
  
  const handleTradeRequest = async (tradeCard, tcgCode) => {
    if(!tcgCode) {
      alert("친구 코드를 선택해주세요.");
      return;
    }

    if(!tradeCard) {
      alert("카드를 선택해주세요.");
      return;
    }

    console.log(tradeCard, tcgCode);

    try {
      const response = await postTcgTradeRequest(tradeId, {
        tcgCode,
        cardCode: tradeCard.code,
        cardName: tradeCard.nameKo,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      setAlertTitle("카드 교환 신청 에러");
      setAlertMsg(error.response.data.message);
      setBackRouter(true);
      setShowAlert(true);
    }
  }

  const checkLogin = () => {
    if (isLogin) return true;
    setAlertTitle('로그인이 필요해요.');
    setAlertMsg('로그인 후 카드를 교환해보세요.');
    setShowAlert(true)
    return false;
  }

  const getDetail = async () => {
    try {
      const response = await getTcgTradeDetail(tradeId);
      setData(response.data);
      setIsMy(response.data.isMy);

      if (isLogin) {
        const tcgCodeList = await getTcgCodeList();
        setTcgCodeList(tcgCodeList.data);
      }
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
    getDetail();
  }, [isLogin, isMounted])

  if (!isMounted) {
    return null;
  }


  return (
    <>
      <AlertDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        preventCloseOnOutsideClick={true}
        handleOk={handleOk}
        isConfrim={false}
        title={alertTitle}
        msg={alertMsg}
      />
        <TradeHeader data={data} />
        <div className="flex flex-col gap-8 mt-2">
          <TradeBox checkLogin={checkLogin} data={data} isMy={isMy} tcgCodeList={tcgCodeList} onTradeRequest={handleTradeRequest} />
          {isMy && <ButtonGroup tradeId={tradeId} />}
          <TradeList isMy={isMy} isLogin={isLogin} />
        </div>
    </>
  );
}