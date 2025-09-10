import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiRoutes, translate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import AgencyCodeInput from "./AgencyCodeInput";
import DynamicSelect from "@/components/DynamicSelect";
import type { Branch, CityOption, ProvinceOption } from "@/types";
import { SelectItem } from "@/components/ui/select";
import PhoneNumberInput from "./PhoneNumberInput";
import AgentType from "./AgentType";
import { Input } from "@/components/ui/input";
import { detailsSchema } from "./schema";
import { BranchesCombobox } from "./BranchesComboBox";
import { type DetailsFormProps } from "./detailsForm.d";
import { useState, useTransition } from "react";
import { axiosInstance } from "@/api";
import { useNavigate } from "react-router";
import LoadingBtn from "@/components/LoadingBtn";

export default function DetailsForm({ first_name, last_name, phone_number }: DetailsFormProps) {
  const [cityFullObj, setCityFullObj] = useState<CityOption | undefined>();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      agentCode: "",
      city: "",
      province: "",
      insuranceBranch: undefined,
      landline: "",
      agentType: "real",
    },
    reValidateMode: "onChange",
  });

  const province = form.watch("province");
  const agentType = form.watch("agentType");
  const insuranceBranch = form.watch("insuranceBranch") as unknown as Branch;

  function renderStateItems(province: ProvinceOption) {
    return (
      <SelectItem key={province.id + province.country} value={province.id.toString()}>
        {province.name}
      </SelectItem>
    );
  }
  function renderCityItems(city: CityOption) {
    return (
      <SelectItem key={city.id} value={city.id.toString()} onMouseDown={() => setCityFullObj(city)}>
        {city.name}
      </SelectItem>
    );
  }

  function onAgentTypeValueChange(newValue: "real" | "legal") {
    form.setValue("agentType", newValue);
    if (newValue === "real") form.setValue("name", undefined);
  }

  function handleInsuranceBranchChange(value: Branch | undefined) {
    form.setValue("insuranceBranch", value);
  }

  function handleSubmit(data: z.infer<typeof detailsSchema>) {
    const backData = {
      agent_code: data.agentCode,
      first_name,
      last_name,
      phone_number,
      name: data.name,
      phone: data.landline,
      province: data.province,
      insurance_branch: (data.insuranceBranch as Branch)?.id,
      city_code: cityFullObj?.fanavaran_code,
      county: cityFullObj?.id,
      agency_type: data.agentType,
    };

    startTransition(async () => {
      const res = await axiosInstance.post(apiRoutes.signup, backData);

      if (res.data.is_success) {
        localStorage.setItem("refreshToken", res.data.response.refresh);
        localStorage.setItem("accessToken", res.data.response.access);
        navigate("/status-check");
      }
    });
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="agentCode"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{translate("agentCode")}</FormLabel>

                  <AgencyCodeInput data-error={!!formState.errors.agentCode} {...field} />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{translate("province")}</FormLabel>

                  <DynamicSelect<ProvinceOption>
                    data-error={!!formState.errors.province}
                    url={apiRoutes.states}
                    placeholder={translate("selectProvince")}
                    {...field}
                    onChange={value => {
                      field.onChange(value);
                      form.setValue("city", undefined);
                      form.setValue("insuranceBranch", undefined);
                    }}
                    renderItem={renderStateItems}
                  />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{translate("city")}</FormLabel>

                  <DynamicSelect<CityOption>
                    data-error={!!formState.errors.city}
                    disabled={!form.watch("province")}
                    url={`${apiRoutes.cities}?province=${form.getValues().province}`}
                    placeholder={translate("selectCity")}
                    renderItem={renderCityItems}
                    {...field}
                  />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insuranceBranch"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{translate("insuranceBranch")}</FormLabel>

                  <BranchesCombobox
                    data-error={formState.errors.insuranceBranch}
                    disabled={!province}
                    province={province}
                    {...field}
                    value={insuranceBranch}
                    onChange={handleInsuranceBranchChange}
                  />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landline"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{translate("landline")}</FormLabel>

                  <PhoneNumberInput
                    maxLength={8}
                    data-error={formState.errors.landline}
                    prefix="021"
                    placeholder="XX - XX - XX - XX"
                    {...field}
                  />
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agentType"
              render={({ field, formState }) => (
                <FormItem>
                  <AgentType
                    data-error={formState.errors.agentType}
                    {...field}
                    onValueChange={onAgentTypeValueChange}
                  />

                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            {agentType === "legal" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>{translate("branchName")}</FormLabel>

                    <Input
                      data-error={!!formState.errors.name}
                      placeholder={translate("enterBranchName")}
                      {...field}
                    />
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
