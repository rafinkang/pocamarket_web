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
 * 
 * @param {*} param0 
 * @returns 
 */

export default function ConfirmDialog({ children = null, title = "", msg = "", content = null, isConfrim = false, cancelBtnName = "취소", okBtnName = "확인", handleCancel = () => { }, handleOk = () => { } }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{msg}</DialogDescription>
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
