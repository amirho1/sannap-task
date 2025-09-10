import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { debounce, translate } from "@/lib/utils";
import PhoneNumberInput from "./PhoneNumberInput";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, type ChangeEvent } from "react";
import LoadingBtn from "@/components/LoadingBtn";
import type { AxiosResponse } from "axios";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(11, { message: translate("phoneNumberMustBe11Chars") })
    .max(11, { message: translate("phoneNumberMustBe11Chars") })
    .regex(/^09[0-9]{9}$/, { message: translate("invalidPhoneNumber") }),
});

interface PhoneNumberFormProps {
  sendOTP: (phone: string) => Promise<AxiosResponse<any, any>>;
  value: string;
  onPhoneChange: (phone: string) => void;
}

export default function PhoneNumberForm({ sendOTP, value, onPhoneChange }: PhoneNumberFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: value },
    reValidateMode: "onSubmit",
  });

  function handleContinue(z: z.infer<typeof phoneSchema>) {
    startTransition(async () => {
      await sendOTP(z.phone);
    });
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    onPhoneChange(e.target.value);
  }

  const debouncedPhoneChange = debounce(handlePhoneChange);

  return (
    <Card className="text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleContinue)} className="[&>*+*]:mt-6">
          <CardHeader>
            <CardTitle>{translate("insertPhoneNumber")}</CardTitle>
            <CardDescription className="mt-2">{translate("youReceiveOtp")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="phone"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{translate("phoneNumber")}</FormLabel>
                  <PhoneNumberInput
                    maxLength={11}
                    prefix="98+"
                    data-error={!!formState.errors.phone}
                    {...field}
                    onChange={e => {
                      field.onChange(e);
                      debouncedPhoneChange(e);
                    }}
                  />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-6 flex flex-col">
            <LoadingBtn loading={isPending} className="w-full" type="submit">
              {translate("continue")}
            </LoadingBtn>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
