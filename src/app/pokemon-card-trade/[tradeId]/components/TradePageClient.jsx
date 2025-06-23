"use client";

import useAuthStore from "@/store/authStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlertDialog from "@/components/dialog/AlertDialog";
import TradeHeader from "./TradeHeader";
import ButtonGroup from "./ButtonGroup";
import TradeBox from "./TradeBox";
import TradeList from "./TradeList";
import TradeReport from "./TradeReport";

import { getTcgCodeList } from "@/api/tcgCode";
import { getTcgTradeDetail } from "@/api/tcgTrade";
import { postTcgTradeRequest, getTcgTradeRequestList, deleteTcgTradeRequest } from "@/api/tcgTradeRequest";
import { LOGIN } from "@/constants/path";

export default function TradePageClient() {

  const router = useRouter();
  const { tradeId } = useParams();

  const [data, setData] = useState(null);
  const [isMy, setIsMy] = useState(false);
  const [tcgCodeList, setTcgCodeList] = useState([]);
  const [requestList, setRequestList] = useState([]);
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

    if(!isLogin || !tcgCode || !tradeCard) {

      let alertTitle = "";
      let alertMsg = "";

      if(!isLogin) {
        alertTitle = "로그인이 필요해요.";
        alertMsg = "로그인 후 카드를 교환해보세요.";
      } else if(!tcgCode) {
        alertMsg = "친구 코드를 선택해주세요.";
      } else if(!tradeCard) {
        alertMsg = "카드를 선택해주세요.";
      }

      setAlertTitle(alertTitle);
      setAlertMsg(alertMsg);
      setShowAlert(true);
      return;
    }

    try {
      const response = await postTcgTradeRequest(tradeId, {
        tcgCode,
        cardCode: tradeCard.code,
        cardName: tradeCard.nameKo,
      });

      if(response.data == true && response.success == true) {
        const requestListResponse = await getTcgTradeRequestList(tradeId);
        setRequestList(requestListResponse.data.content); 
      }
    } catch (error) {
      console.error(error);
      setAlertTitle("카드 교환 신청 에러");
      setAlertMsg(`error code : ${error.errorCode}, message : ${error.message}`);
      setShowAlert(true);
    }
  }

  const handleRequestCancel = async (tcgTradeRequestId) => {
    try {
      const response = await deleteTcgTradeRequest(tradeId, {
        tcgTradeRequestId,
      });

      if(response.data == true && response.success == true) {
        alert("카드 교환 요청이 취소되었습니다.");
        const requestListResponse = await getTcgTradeRequestList(tradeId);
        setRequestList(requestListResponse.data.content); 
      }

    } catch (error) {
      console.error(error);
      setAlertTitle("카드 교환 취소 에러");
      setAlertMsg(`error code : ${error.errorCode}, message : ${error.message}`);
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
      const requestListResponse = await getTcgTradeRequestList(tradeId);

      setData(response.data);
      setIsMy(response.data.isMy);
      setRequestList(requestListResponse.data.content);

      if (isLogin) {
        const tcgCodeList = await getTcgCodeList();
        setTcgCodeList(tcgCodeList.data);
      }
    } catch (error) {
      console.error(error);
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
        isConfirm={false}
        title={alertTitle}
        msg={alertMsg}
      />
        <TradeHeader data={data} />
        <div className="flex flex-col gap-8 mt-2">
          <TradeBox checkLogin={checkLogin} data={data} isMy={isMy} tcgCodeList={tcgCodeList} onTradeRequest={handleTradeRequest} />
          {isMy && <ButtonGroup tradeId={tradeId} />}
          {!isMy && isLogin && <TradeReport />}
          <TradeList isMy={isMy} isLogin={isLogin} requestList={requestList} 
            onRequestCancel={handleRequestCancel} 
          />
        </div>
    </>
  );
}