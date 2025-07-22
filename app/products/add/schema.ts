import { z } from "zod";

export const productSchema = z.object({
  title: z.string({ required_error: "제목은 필수 입력 항목입니다." }),
  description: z.string({ required_error: "설명은 필수 입력 항목입니다." }),
  photo: z.string({ required_error: "사진은 필수 입력 항목입니다." }),
  price: z.coerce.number({ required_error: "가격은 필수 입력 항목입니다." }),
});
