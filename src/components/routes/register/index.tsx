import PhoneNumberForm from "./PhoneNumberForm";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [step, setStep] = useState(0);
  const steps = [<PhoneNumberForm />];
  const navigate = useNavigate();
  function onBackClick() {
    if (step === 0) navigate("/");
    else setStep(s => Math.max(0, s - 1));
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
