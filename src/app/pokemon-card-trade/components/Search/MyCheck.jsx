import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function MyCheck({ isMy, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={isMy} onCheckedChange={onChange} />
      <Label>내 카드만 보기</Label>
    </div>
  );
}