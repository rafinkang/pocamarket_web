"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import { updateMyInfo } from "@/api/users";

export default function PasswordChangeDialog({
  children = null,
}) {
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPasswordConfirmMatch, setIsPasswordConfirmMatch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!isPasswordMatch) return;
    if (!isPasswordConfirmMatch) return;
    if (originalPassword === newPassword) return;
    if (newPassword !== newPasswordConfirm) return;
    
    updateMyInfo({
      currentPassword: originalPassword,
      newPassword: newPassword,
    }).then((res) => {
      if (res.success === true) {
        alert('비밀번호가 변경되었습니다.');
        setIsOpen(false);
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    })

  }

  const onOpenChange = (open) => {
    setIsOpen(open);
  }

  useEffect(() => {
    if (newPassword.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/)) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [newPassword]);

  useEffect(() => {
    if (newPassword === newPasswordConfirm) {
      setIsPasswordConfirmMatch(true);
    } else {
      setIsPasswordConfirmMatch(false);
    }
  }, [newPassword, newPasswordConfirm]);

  useEffect(() => {
    // onDestroy component reset
    if (isOpen === false) {
      setOriginalPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setIsPasswordMatch(false);
      setIsPasswordConfirmMatch(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogDescription>
            비밀번호는 8~20자 숫자, 영문자, 특수문자를 각각 1개 이상 포함해야 합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="originalPassword" className="text-sm font-medium">현재 비밀번호</label>
            <Input
              type="password"
              placeholder="현재 비밀번호"
              value={originalPassword}
              onChange={(e) => setOriginalPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="text-sm">새 비밀번호</label>
            <Input
              className={newPassword.length > 0 && !isPasswordMatch ? "border-destructive" : ""}
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPassword.length > 0 && !isPasswordMatch && (
              <p className="text-destructive text-xs flex items-center gap-1">
                <GoAlert className="text-destructive" />
                비밀번호는 8~20자 숫자, 영문자, 특수문자를 각각 1개 이상 포함해야 합니다.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="newPasswordConfirm" className="text-sm">새 비밀번호 확인</label>
            <Input
              className={newPasswordConfirm.length > 0 && !isPasswordConfirmMatch ? "border-destructive" : ""}
              type="password"
              placeholder="새 비밀번호 확인"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
            {newPasswordConfirm.length > 0 && !isPasswordConfirmMatch && (
              <p className="text-destructive text-xs flex items-center gap-1">
                <GoAlert className="text-destructive" />
                비밀번호가 일치하지 않습니다. 다시 입력해주세요.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">변경</Button>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}