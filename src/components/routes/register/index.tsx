import PhoneNumberForm from "./PhoneNumberForm";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import OtpValidateForm from "./OtpValidateForm";
import { axiosInstance } from "@/api";
import { apiRoutes } from "@/lib/utils";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [datetime, setDatetime] = useState(0);
  const navigate = useNavigate();

  function onBackClick() {
    if (step === 0) navigate("/");
    else setStep(s => Math.max(0, s - 1));
  }

  async function sendOTP(phone: string) {
    const res = await axiosInstance.post(apiRoutes.createOTP, { phone_number: phone });
    if (res.data.is_success && step === 0) setStep(s => Math.min(steps.length - 1, s + 1));
    if (res.data.is_success) handleDateTime();
    return res;
  }

  function handleNextStep() {
    setStep(s => Math.min(steps.length - 1, s + 1));
  }

  const steps = [
    <PhoneNumberForm value={phone} onPhoneChange={setPhone} sendOTP={sendOTP} />,
    <OtpValidateForm
      datetime={datetime}
      phone={phone}
      sendOTP={sendOTP}
      nextStep={handleNextStep}
    />,
  ];

  function handleDateTime() {
    setDatetime(Date.now());
  }

  return (
    <div className="m-auto p-6">
      <Button
        className="absolute top-[-50px] right-2"
        variant="icon"
        size="icon"
        onClick={onBackClick}
      >
        <ChevronRight size={24} color="white" />
      </Button>

      {steps[step]}
    </div>
  );
}
