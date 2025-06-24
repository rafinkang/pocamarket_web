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
import { getTcgTradeDetail } from "@/api/tcgTrade";
import { postTcgTradeRequest, getTcgTradeRequestList, updateTcgTradeRequestStatus, deleteTcgTradeRequest } from "@/api/tcgTradeRequest";
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

  // 공통 에러 처리 함수
  const showErrorAlert = (title, error) => {
    console.error(error);
    setAlertTitle(title);
    setAlertMsg(`error code : ${error.response.data.errorCode}, message : ${error.response.data.message}`);
    setShowAlert(true);
  }

  // 공통 성공 처리 함수
  const handleSuccessResponse = async (response, successMessage, errorTitle) => {
    if (response.data === true && response.success === true) {
      alert(successMessage);
      const requestListResponse = await getTcgTradeRequestList(tradeId);
      setRequestList(requestListResponse.data);
      return true;
    } else {
      setAlertTitle(errorTitle);
      setAlertMsg(`error code : ${response.errorCode}, message : ${response.message}`);
      setShowAlert(true);
      return false;
    }
  }

  // 유효성 검사 함수
  const validateTradeRequest = (tradeCard, tcgCode) => {
    if (!isLogin) {
      setAlertTitle("로그인이 필요해요.");
      setAlertMsg("로그인 후 카드를 교환해보세요.");
      setShowAlert(true);
      return false;
    }
    if (!tcgCode) {
      setAlertTitle("");
      setAlertMsg("친구 코드를 선택해주세요.");
      setShowAlert(true);
      return false;
    }
    if (!tradeCard) {
      setAlertTitle("");
      setAlertMsg("카드를 선택해주세요.");
      setShowAlert(true);
      return false;
    }
    return true;
  }

  const handleTradeRequest = async (tradeCard, tcgCode) => {
    if (!validateTradeRequest(tradeCard, tcgCode)) return;

    try {
      const response = await postTcgTradeRequest(tradeId, {
        tcgCode,
        cardCode: tradeCard.code,
        cardName: tradeCard.nameKo,
      });

      await handleSuccessResponse(response, "카드 교환 요청이 완료되었습니다.", "카드 교환 신청 에러");
    } catch (error) {
      showErrorAlert("카드 교환 신청 에러", error);
    }
  }

  const handleRequestAccept = async (tcgTradeRequestId, statusNum) => {
    try {
      const response = await updateTcgTradeRequestStatus(tradeId, {
        tcgTradeRequestId,
        status: statusNum,
      });

      await handleSuccessResponse(response, "카드 교환 요청이 수락되었습니다.", "카드 교환 에러");
    } catch (error) {
      showErrorAlert("카드 교환 에러", error);
    }
  }

  const handleRequestCancel = async (tcgTradeRequestId) => {
    try {
      const response = await deleteTcgTradeRequest(tradeId, {
        tcgTradeRequestId,
      });

      await handleSuccessResponse(response, "카드 교환 요청이 취소되었습니다.", "카드 교환 취소 에러");
    } catch (error) {
      showErrorAlert("카드 교환 취소 에러", error);
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
      setRequestList(requestListResponse.data);

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
        contentClassName={"z-[151]"}
      />
      <TradeHeader data={data} />
      <div className="flex flex-col gap-2 mt-2">
        <TradeBox checkLogin={checkLogin} data={data} isMy={isMy} tcgCodeList={tcgCodeList} onTradeRequest={handleTradeRequest} />
        <ButtonGroup tradeId={tradeId} data={data} isMy={isMy} isLogin={isLogin}/>
        <TradeList isMy={isMy} isLogin={isLogin} requestList={Array.isArray(requestList) ? requestList : requestList.content}
          onRequestAccept={handleRequestAccept}
          onRequestCancel={handleRequestCancel}
        />
      </div>
    </>
  );
}