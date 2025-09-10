import { translate } from "@/lib/utils";
import z from "zod";

export const detailsSchema = z
  .object({
    agentCode: z.string().nonempty({ message: translate("agentCodeIsRequire") }),
    province: z.string().nonempty({ message: translate("provinceIsRequired") }),
    city: z.string().refine(value => value, { message: translate("cityIsRequired") }),
    insuranceBranch: z.refine(value => value, { message: translate("insuranceBranchIsRequired") }),
    landline: z
      .string()
      .nonempty({ message: translate("landlineIsRequired") })
      .min(8, { message: translate("atLeast8") }),
    agentType: z.union([z.literal("real"), z.literal("legal")]),
    name: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const isEmpty = val.name == null || val.name === "";

    if (val.agentType === "legal" && isEmpty) {
      ctx.addIssue({
        path: ["name"],
        code: z.ZodIssueCode.custom,
        message: translate("nameIsRequiredForLegal"),
      });
    }
  });
