import { z } from "zod";
import { CURRENT_YEAR } from "../constants/constants";

/**
 * Zod schema for validating the `year` route parameter.
 * - Coerces the input to a number (e.g. from string to number).
 * - Ensures the year is an integer.
 * - Requires the year to be at least 2005.
 * - Provides custom error messages for invalid types and values.
 */

export const yearParamSchema = z.object({
  year: z.coerce
    .number({ invalid_type_error: "Year must be a number" })
    .int()
    .min(2005, { message: "Year must be at least 2005" })
    .max(CURRENT_YEAR, { message: "Year cannot be in the future" }),
});
