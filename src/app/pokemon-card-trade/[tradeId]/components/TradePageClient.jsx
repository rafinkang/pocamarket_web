"use client";

import useAuthStore from "@/store/authStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlertDialog from "@/components/dialog/AlertDialog";
import TradeHeader from "./TradeHeader";
import TradeBox from "./TradeBox";
import TradeList from "./TradeList";
import TraderInfo from "./TraderInfo";

import { getTcgCodeList, getTradeRequestTcgCode } from "@/api/tcgCode";
import { postTcgTradeRequest, getTcgTradeRequestList, updateTcgTradeRequestStatus, deleteTcgTradeRequest } from "@/api/tcgTradeRequest";
import { LOGIN } from "@/constants/path";
import { REQUEST_COMPLETE, REQUEST_PROCESS } from "@/constants/tradeRequestStatus";

export default function TradePageClient({ tradeId, tradeDetail }) {

  const router = useRouter();

  const [data, setData] = useState(null);
  const [isMy, setIsMy] = useState(false);
  const [tcgCodeList, setTcgCodeList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [alertTitle, setAlertTitle] = useState('로그인이 필요해요.');
  const [alertMsg, setAlertMsg] = useState('로그인 후 카드를 교환해보세요.');
  const [backRouter, setBackRouter] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openTcgCode, setOpenTcgCode] = useState(false);

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
      setAlertMsg(`message : ${response.message}`);
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
      console.error(error);
    }
  }

  const handleRequestAccept = async (tcgTradeRequestId, statusNum) => {
    try {
      const response = await updateTcgTradeRequestStatus(tradeId, {
        tcgTradeRequestId,
        status: statusNum,
      });

      let message = "카드 교환 요청이 거절되었습니다."

      if(response.data === REQUEST_PROCESS) {
        message = "카드 교환 요청이 수락되었습니다.";
        response.data = true;
      } else if(response.data === REQUEST_COMPLETE) {
        message = "카드 교환 요청이 완료되었습니다.";
        response.data = true;
      }

      await handleSuccessResponse(response, message, "카드 교환 에러");
    } catch (error) {
      console.error(error);
    }
  }

  const handleRequestCancel = async (tcgTradeRequestId) => {
    try {
      const response = await deleteTcgTradeRequest(tradeId, {
        tcgTradeRequestId,
      });

      await handleSuccessResponse(response, "카드 교환 요청이 취소되었습니다.", "카드 교환 취소 에러");
    } catch (error) {
      console.error(error);
    }
  }

  const getOpenTcgCode = async (tradeRequestId, isMy, isRequestMy) => {
    try {
      const response = await getTradeRequestTcgCode(tradeId, tradeRequestId);
      
      if (response.success === true) {
        if(isMy) {
          setRequestList(prevList => {
            return prevList.map(request => 
              request.tradeRequestId === tradeRequestId 
                ? { ...request, tcgCode: response.data }
                : request
            );
          });
        } else if(isRequestMy) {
          setOpenTcgCode(response.data);
        }
      }

    } catch (error) {
      console.error(error);
      alert("친구코드 가져오기에 실패했습니다.");
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
      const requestListResponse = await getTcgTradeRequestList(tradeId);
      setData(tradeDetail.data);
      setIsMy(tradeDetail.data.isMy);
      setRequestList(requestListResponse.data);

      if (isLogin) {
        const tcgCodeList = await getTcgCodeList();
        setTcgCodeList(tcgCodeList.data);

        const processRequest = requestListResponse.data?.filter(request => request.status >= REQUEST_PROCESS)[0];
        if(processRequest && isLogin && (tradeDetail.data.isMy || processRequest.isMy)) {
          getOpenTcgCode(processRequest.tradeRequestId, tradeDetail.data.isMy, processRequest.isMy);
        }
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
      {data && 
        <>
          <TradeHeader tradeId={tradeId} data={data} isMy={isMy} isLogin={isLogin} />
          {/* <ButtonGroup tradeId={tradeId} data={data} isMy={isMy} isLogin={isLogin}/> */}
          <div className="flex flex-col gap-10 mt-2">
            <TradeBox checkLogin={checkLogin} data={data} isMy={isMy} tcgCodeList={tcgCodeList} onTradeRequest={handleTradeRequest} />
            <TraderInfo data={data} tradeId={tradeId} isMy={isMy} isLogin={isLogin} openTcgCode={openTcgCode} />
            <TradeList isMy={isMy} isLogin={isLogin} requestList={Array.isArray(requestList) ? requestList : requestList.content}
              onRequestAccept={handleRequestAccept}
              onRequestCancel={handleRequestCancel}
            />
          </div>
        </>
      }
    </>
  );
}