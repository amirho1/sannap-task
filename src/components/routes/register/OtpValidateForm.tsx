import { useEffect, useRef, useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import useTimer from "@/lib/hooks/useTimer";
import LoadingBtn from "@/components/LoadingBtn";
import { apiRoutes, cn, translate } from "@/lib/utils";
import { axiosInstance } from "@/api";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { type AxiosResponse } from "axios";
import type { ResponseT } from "@/types";

interface OtpProps {
  nextStep: () => void;
  datetime: number;
  phone: string;
  sendOTP: (phone: string) => Promise<AxiosResponse<ResponseT, any>>;
}

export default function OtpValidateForm({ nextStep, datetime, phone, sendOTP }: OtpProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<null | HTMLFormElement>(null);

  const { minutes, seconds, time } = useTimer({ datetime: datetime, waitTime: 60000 * 2 });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    if (formRef.current) formRef.current.focus();
  }, []);

  function handleOtpChange(string: string) {
    if (string.length === 5 && formRef.current && !isPending && time > 0) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }

  async function handleSubmit() {
    const formData = new FormData(formRef.current!);
    formData.append("phone_number", phone);

    startTransition(async () => {
      const res = await axiosInstance.post(apiRoutes.validateOTP, formData);
      if (res.data.is_success) nextStep();
    });
  }

  const timer = (
    <div className={cn(time > 0 && "text-muted-foreground")}>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );

  const resendOTPEl = (
    <Button type="button" variant="ghost" size="icon" onClick={() => sendOTP(phone)}>
      <RotateCw className="text-black-50" size={16} />
    </Button>
  );

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{translate("enterOTP")}</CardTitle>
        <CardDescription className="flex items-center justify-center ">
          <img src="/public/pen.svg" width={18} height={18} loading="lazy" />
          <span className="mr-2">{phone}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          ref={formRef}
        >
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              maxLength={5}
              disabled={isPending || time <= 0}
              autoFocus
              name="code"
              pattern={REGEXP_ONLY_DIGITS}
              onChange={handleOtpChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div
            className={cn(
              "text-xs flex items-center justify-center gap-4.5 mt-4",
              time > 0 && "text-muted-foreground"
            )}
          >
            {translate("resendOTP")}
            {time ? timer : resendOTPEl}
          </div>

          <LoadingBtn
            className="w-full mt-4"
            type="submit"
            disabled={isPending || time <= 0 || isSubmitButtonDisabled}
          >
            {translate("continue")}
          </LoadingBtn>
        </form>
      </CardContent>
    </Card>
  );
}
