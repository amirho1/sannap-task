import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { debounce, translate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Inputs } from "@/types";

const fullNameSchema = z.object({
  firstname: z.string().min(1, { message: translate("firstnameIsRequired") }),
  lastname: z.string().min(1, { message: translate("lastnameIsRequired") }),
});

interface FullNameFormProps {
  nextStep: () => void;
  onChange: (key: keyof FullNameFormProps["fullName"], value: string) => void;
  fullName: { firstname: string; lastname: string };
}

export default function FullNameForm({
  nextStep,
  onChange: handleChange,
  fullName,
}: FullNameFormProps) {
  const form = useForm({
    resolver: zodResolver(fullNameSchema),
    defaultValues: { firstname: fullName.firstname, lastname: fullName.lastname },
    reValidateMode: "onSubmit",
  });

  const debounceHandleChange = debounce(handleChange);

  const inputs: Inputs<keyof FullNameFormProps["fullName"]>[] = [
    {
      name: "firstname",
      label: translate("name"),
      placeholder: translate("enterName"),
      onChange(e) {
        debounceHandleChange("firstname", e.target.value);
      },
    },
    {
      name: "lastname",
      label: translate("lastname"),
      placeholder: translate("enterLastname"),
      onChange(e) {
        debounceHandleChange("lastname", e.target.value);
      },
    },
  ];

  return (
    <Card className="text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(nextStep)} className="space-y-6">
          <CardContent className="space-y-8">
            {inputs.map(({ label, name, placeholder, onChange }) => (
              <FormField
                control={form.control}
                key={name}
                name={name}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Input
                      data-error={!!formState.errors[name]}
                      placeholder={placeholder}
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                        onChange?.(e);
                      }}
                    />
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>

          <CardFooter className="mt-6 flex flex-col">
            <Button className="w-full" type="submit">
              {translate("continue")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
