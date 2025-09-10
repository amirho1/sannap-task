import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { translate } from "@/lib/utils";
import type { RadioGroupProps } from "@radix-ui/react-radio-group";

export default function AgentType(props: RadioGroupProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <div className="flex gap-12">
      <Label className="text-black-90">{translate("typeOFAgent")}</Label>
      <RadioGroup className="flex gap-12" {...props}>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Label htmlFor="legal">{translate("legal")}</Label>
          <RadioGroupItem value="legal" id="legal" />
        </div>
        <div className="flex items-center space-x-1.5">
          <Label htmlFor="real">{translate("real")}</Label>
          <RadioGroupItem value="real" id="real" />
        </div>
      </RadioGroup>
    </div>
  );
}
