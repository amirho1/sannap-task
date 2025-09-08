import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { translate } from "@/lib/utils";
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

const phoneSchema = z.object({
  phone: z
    .string()
    .min(11, { message: translate("phoneNumberMustBe11Chars") })
    .max(11, { message: translate("phoneNumberMustBe11Chars") })
    .regex(/^09[0-9]{9}$/, { message: translate("invalidPhoneNumber") }),
});

export default function PhoneNumberForm() {
  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
    reValidateMode: "onSubmit",
  });

  return (
    <Card className="text-center">
      <Form {...form}>
        <form className="[&>*+*]:mt-6">
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
                  <PhoneNumberInput data-error={!!formState.errors.phone} {...field} />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-6">
            <Button className="w-full" type="submit">
              {translate("continue")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
