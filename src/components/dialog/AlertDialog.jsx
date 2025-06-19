"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/**
 * 확인/취소 버튼을 포함하는 다이얼로그 컴포넌트.
 * @param {boolean | null} [props.open=null] - 제어 모드에서 다이얼로그의 열림 상태를 제어. 이 값이 `null`이 아니면 제어 모드로 동작.
 * @param {(isOpen: boolean) => void} [props.onOpenChange] - 제어 모드에서 사용자가 닫기 동작을 했을 때 호출되는 콜백 함수.
 * @param {React.ReactNode | null} [props.children=null] - 비제어 모드에서 다이얼로그를 여는 트리거(버튼 등) 역할을 하는 자식 요소.
 * @param {string} [props.title=""] - 다이얼로그의 제목.
 * @param {string} [props.msg=""] - 다이얼로그의 설명. HTML 문자열을 포함할 수 있으며, 이 경우 `dangerouslySetInnerHTML`로 렌더링.
 * @param {React.ReactNode | null} [props.content=null] - 다이얼로그 본문에 추가로 렌더링할 JSX 요소.
 * @param {boolean} [props.isConfirm=false] - '확인/취소' 버튼이 모두 필요한 확인 창 모드인지 여부. `true`일 때 취소 버튼이 보임.
 * @param {string} [props.cancelBtnName="취소"] - 취소 버튼에 표시될 텍스트.
 * @param {string} [props.okBtnName="확인"] - 확인 버튼에 표시될 텍스트.
 * @param {() => void} [props.handleCancel=()=>{}] - 취소 버튼 클릭 시 실행될 콜백 함수.
 * @param {() => void} [props.handleOk=()=>{}] - 확인 버튼 클릭 시 실행될 콜백 함수.
 * @param {boolean} [props.preventCloseOnOutsideClick=false] - 다이얼로그 바깥 영역 클릭 시 닫히지 않도록 할지 여부.
 * @returns {JSX.Element}
 */
export default function ConfirmDialog({ 
    open = null,
    onOpenChange = () => {},
    children = null, 
    title = "", 
    msg = "", 
    content = null, 
    isConfrim = false, 
    cancelBtnName = "취소", 
    okBtnName = "확인", 
    handleCancel = () => { }, 
    handleOk = () => { },
    preventCloseOnOutsideClick = false
  }) {
  const isControlled = open !== null;
  const dialogProps = {};

  if (isControlled) {
    dialogProps.open = open;
    dialogProps.onOpenChange = onOpenChange;
  }

  const handleInteractOutside = (event) => {
    if (preventCloseOnOutsideClick) {
      event.preventDefault();
    }
  };


  return (
    <Dialog {...dialogProps}>
      {!isControlled && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent onInteractOutside={handleInteractOutside} showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild style={{ paddingTop : msg && '12px' }}>
            <div dangerouslySetInnerHTML={{ __html: msg }} />
          </DialogDescription>
        </DialogHeader>

        {content}

        <DialogFooter>
          <DialogClose asChild>
            {isConfrim && <Button onClick={handleCancel} variant="outline">{cancelBtnName}</Button>}
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleOk} type="submit">{okBtnName}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
