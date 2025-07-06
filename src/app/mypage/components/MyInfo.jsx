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
import { Badge } from "@/components/ui/badge"
import useAuthStore from "@/store/authStore"
import { useEffect, useState } from "react"
import PasswordChangeDialog from "./PasswordChangeDialog"
import { GoCheck } from "react-icons/go";
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  UserCheck,
  Settings
} from "lucide-react";

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
   * 등급에 따른 배지 스타일 반환
   */
  const getGradeBadge = (gradeDesc, grade) => {
    switch (grade) {
      case 'ADMIN':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">👑 {gradeDesc}</Badge>;
      case 'LV04':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⭐ {gradeDesc}</Badge>;
      case 'LV03':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">🥈 {gradeDesc}</Badge>;
      case 'LV02':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">🥉 {gradeDesc}</Badge>;
      default:
        return <Badge variant="outline">🌱 {gradeDesc}</Badge>;
    }
  };

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
    <Card className={`${className}`}>
      {!myInfo ? (
        <div className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {myInfo.nickname}님의 정보
                  </CardTitle>
                  <CardDescription className="text-gray-600 flex items-center space-x-2">
                    <span>현재 등급:</span>
                    {getGradeBadge(myInfo.gradeDesc, myInfo.grade)}
                  </CardDescription>
                </div>
              </div>
              {!isUpdate && (
                <Button 
                  onClick={() => setIsUpdate(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  정보 수정
                </Button>
              )}
            </div>
          </CardHeader>

          {isUpdate ? (
            <>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    정보 수정
                  </h3>
                  <div className="space-y-4">
                    {/* 아이디 (수정 불가) */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        아이디
                      </label>
                      <Input 
                        type="text" 
                        value={myInfo.loginId} 
                        disabled 
                        className="bg-gray-50 text-gray-500"
                      />
                    </div>

                    {/* 닉네임 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <UserCheck className="h-4 w-4 mr-2" />
                        닉네임
                      </label>
                      <div className="flex gap-2">
                        <Input 
                          type="text" 
                          placeholder="닉네임" 
                          defaultValue={myInfo.nickname} 
                          onChange={(e) => setNewNickname(e.target.value)}
                          className="flex-1"
                        />
                        <div className="flex items-center">
                          {nicknameCheck ? (
                            <div className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-md">
                              <GoCheck className="w-5 h-5 mr-1" />
                              <span className="text-sm font-medium">확인됨</span>
                            </div>
                          ) : (
                            <Button 
                              variant="outline" 
                              onClick={checkNicknameHandler}
                              className="whitespace-nowrap"
                            >
                              중복확인
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 이메일 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        이메일
                      </label>
                      <div className="flex gap-2">
                        <Input 
                          type="email" 
                          placeholder="이메일" 
                          defaultValue={myInfo.email} 
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2">
                          {emailCheck && (
                            <div className="flex items-center px-2 py-2 bg-green-50 text-green-700 rounded-md">
                              <GoCheck className="w-5 h-5" />
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            onClick={() => alert("준비중입니다.")}
                            className="whitespace-nowrap"
                          >
                            이메일 인증
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 전화번호 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        전화번호
                      </label>
                      <div className="flex gap-2">
                        <Input 
                          type="tel" 
                          placeholder="전화번호" 
                          defaultValue={myInfo.phone} 
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2">
                          {phoneCheck && (
                            <div className="flex items-center px-2 py-2 bg-green-50 text-green-700 rounded-md">
                              <GoCheck className="w-5 h-5" />
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            onClick={() => alert("준비중입니다.")}
                            className="whitespace-nowrap"
                          >
                            인증
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 bg-gray-50 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setIsUpdate(false)}
                  className="hover:bg-gray-100"
                >
                  <X className="h-4 w-4 mr-2" />
                  취소
                </Button>
                <AlertDialog 
                  handleOk={updateUserInfo} 
                  isConfirm={true} 
                  title="회원 정보 변경" 
                  msg="입력하신 내용으로 회원정보가 변경됩니다."
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    저장
                  </Button>
                </AlertDialog>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className="space-y-6">
                {/* 프로필 섹션 */}
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                    <AvatarImage src="/images/profile_default.png" alt="프로필이미지" />
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{myInfo.nickname}</h3>
                    <div className="flex items-center space-x-2">
                      {getGradeBadge(myInfo.gradeDesc)}
                    </div>
                  </div>
                </div>

                {/* 정보 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">이름</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{myInfo.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">이메일</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{myInfo.email}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">전화번호</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{myInfo.phone}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">회원가입일</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{myInfo.createdAt.split('T')[0]}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t">
                <PasswordChangeDialog>
                  <Button variant="outline" className="hover:bg-gray-100">
                    <Shield className="h-4 w-4 mr-2" />
                    비밀번호 변경
                  </Button>
                </PasswordChangeDialog>
                <AlertDialog 
                  handleOk={withdrawUser} 
                  isConfirm={true} 
                  title="회원 탈퇴" 
                  msg="정말로 포카마켓을 탈퇴하시겠습니까ㅠㅠ?"
                >
                  <Button variant="destructive">
                    회원 탈퇴
                  </Button>
                </AlertDialog>
              </CardFooter>
            </>
          )}
        </>
      )}
    </Card>
  )
}