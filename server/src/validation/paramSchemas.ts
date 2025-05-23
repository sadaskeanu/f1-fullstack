import { z } from "zod";

export const yearParamSchema = z.object({
  year: z.coerce
    .number({ invalid_type_error: "Year must be a number" })
    .int()
    .min(2005, { message: "Year must be at least 2005" }),
});
