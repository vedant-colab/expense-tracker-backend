import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ObjectId",
  }),
});

export type IdParamDTO = z.infer<typeof idParamSchema>