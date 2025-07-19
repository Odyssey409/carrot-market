"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  title: z.string({ required_error: "제목은 필수 입력 항목입니다." }),
  description: z.string({ required_error: "설명은 필수 입력 항목입니다." }),
  photo: z.string({ required_error: "사진은 필수 입력 항목입니다." }),
  price: z.coerce.number({ required_error: "가격은 필수 입력 항목입니다." }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
    photo: formData.get("photo"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    // 유저가 업로드한 파일을 파일 시스템에 저장하는 방식의 임시 방편임. 이렇게 하면 좋지 않음. 개션 예정임.
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
    };
  } else {
    const session = await getSession();
    if (session.userId) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          photo: result.data.photo,
          price: result.data.price,
          user: {
            connect: {
              id: session.userId,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
    }
  }
}
