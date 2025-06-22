"use client"

import { deleteMyInfo, getMyInfo, checkNickname, updateMyInfo } from "@/api/users"
import AlertDialog from "@/components/dialog/AlertDialog"
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import useAuthStore from "@/store/authStore"
import { useEffect, useState } from "react"
import PasswordChangeDialog from "./PasswordChangeDialog"
import { GoCheck } from "react-icons/go";

export default function MyInfoPage({ className }) {
  const [myInfo, setMyInfo] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [phoneCheck, setPhoneCheck] = useState(false);



  /**
   * 회원 탈퇴
   */
  const withdrawUser = async () => {
    const res = await deleteMyInfo().then((result) => {
      if (result && result.success == true) {
        // 탍퇴처리 완료 후 로그아웃
        useAuthStore.getState().logout();
      }
    }).catch((err) => {
      console.log('err ::: ', err);
    });
  }

  /**
   * 회원 정보 변경
   */
  const updateUserInfo = async () => {
    let data = {}
    if (nicknameCheck) data.nickname = newNickname;
    if (emailCheck) data.email = newEmail;
    if (phoneCheck) data.phone = newPhone;

    await updateMyInfo(data).then((res) => {
      if (res.success == true) {
        let changeData = {
          ...myInfo,
          ...data
        }
        setMyInfo(changeData);
        useAuthStore.getState().login(changeData);
        setIsUpdate(false);
        alert('회원 정보가 변경되었습니다.');
      } else {
        alert('회원 정보 변경에 실패했습니다.');
      }
    })
  }

  /**
   * 닉네임 중복 확인
   */
  const checkNicknameHandler = async () => {
    if (newNickname.length === 0 || newNickname === myInfo.nickname) {
      alert('변경할 닉네임을 입력해주세요.');
      return;
    }
    if (newNickname.length < 2 || newNickname.length > 10) {
      alert('닉네임은 2자 이상 10자 이하로 입력해주세요.');
      return;
    }

    await checkNickname(newNickname).then((res) => {
      if (res.data === true) {
        setNicknameCheck(true);
      } else {
        setNicknameCheck(false);
        alert('이미 사용중인 닉네임입니다.');
      }
    })
  }


  // 마운트시 1회 실행
  useEffect(() => {
    getMyInfo().then((res) => {
      if (res.data) {
        setMyInfo(res.data);
        setNewNickname(res.data.nickname);
        setNewEmail(res.data.email);
        setNewPhone(res.data.phone);
      }
    })
  }, [])


  useEffect(() => {
    setNicknameCheck(false);
  }, [newNickname]);

  useEffect(() => {
    if (newEmail?.length > 0) {
      if (newEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        setEmailCheck(true);
      } else {
        setEmailCheck(false);
      }
    } else {
      setEmailCheck(false);
    }
  }, [newEmail]);

  useEffect(() => {
    if (newPhone?.length > 0) {
      if (newPhone.match(/^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/)) {
        setPhoneCheck(true);
      } else {
        setPhoneCheck(false);
      }
    } else {
      setPhoneCheck(false);
    }
  }, [newPhone]);

  return (
    <>
      <Card className={`${className}`}>
        {!myInfo ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="mx-10 h-[125px] rounded-xl" />
            <div className="space-y-2 space-x-3.5">
              <Skeleton className="mx-10 h-4 w-2/3" />
              <Skeleton className="mx-10 h-4 w-1/3" />
            </div>
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{myInfo.nickname}님의 정보</CardTitle>
              <CardDescription>현재 등급은 {myInfo.gradeDesc} 입니다.</CardDescription>
            </CardHeader>
            {isUpdate ? (
              <>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">아이디</p>
                    <Input type="text" placeholder="아이디" defaultValue={myInfo.loginId} disabled />

                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">닉네임</p>
                    <Input type="text" placeholder="닉네임" defaultValue={myInfo.nickname} onChange={(e) => setNewNickname(e.target.value)} />
                    <div className="flex flex-row gap-2 justify-end">
                      {nicknameCheck ? (
                        <GoCheck className="w-8 h-8 text-green-500" />
                      ) : (
                        <Button variant="outline" onClick={checkNicknameHandler}>중복확인</Button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">이메일</p>
                    <Input type="text" placeholder="이메일" defaultValue={myInfo.email} onChange={(e) => setNewEmail(e.target.value)} />
                    <div className="flex flex-row gap-2 justify-end">
                      {emailCheck ? (
                        <>
                          <GoCheck className="w-8 h-8 text-green-500" />
                          <Button variant="outline" onClick={() => alert("준비중입니다.")}>이메일 인증</Button>
                        </>
                      ) : (
                        <Button variant="outline" onClick={() => alert("준비중입니다.")}>이메일 인증</Button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">전화번호</p>
                    <Input type="text" placeholder="전화번호" defaultValue={myInfo.phone} onChange={(e) => setNewPhone(e.target.value)} />
                    <div className="flex flex-row gap-2 justify-end">
                      {phoneCheck ? (
                        <GoCheck className="w-8 h-8 text-green-500" />
                      ) : (
                        <Button variant="outline" onClick={() => alert("준비중입니다.")}>인증</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <AlertDialog handleOk={updateUserInfo} isConfrim={true} title="회원 정보 변경" msg="입력하신 내용으로 회원정보가 변경됩니다.">
                    <Button variant="outline">저장</Button>
                  </AlertDialog>
                  <Button variant="outline" onClick={() => setIsUpdate(false)}>취소</Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardContent className="grid grid-cols-1 items-start md:grid-cols-2 gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/images/profile_default.png" alt="프로필이미지" />
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">{myInfo.nickname}</h3>
                      <p className="text-sm text-gray-500">{myInfo.gradeDesc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <span>이름</span>
                    <p>{myInfo.name}</p>
                    <span>이메일</span>
                    <p>{myInfo.email}</p>
                    <span>전화번호</span>
                    <p>{myInfo.phone}</p>
                    <span>회원가입일</span>
                    <p>{myInfo.createdAt.split('T')[0]}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUpdate(true)}>회원 정보 변경</Button>
                  <PasswordChangeDialog>
                    <Button variant="outline">비밀번호 변경</Button>
                  </PasswordChangeDialog>
                  <AlertDialog handleOk={withdrawUser} isConfrim={true} title="회원 탈퇴" msg="정말로 포카마켓을 탈퇴하시겠습니까ㅠㅠ?">
                    <Button variant="destructive">회원 탈퇴</Button>
                  </AlertDialog>
                </CardFooter>
              </>
            )}
          </>
        )}
      </Card>
    </>
  )
}