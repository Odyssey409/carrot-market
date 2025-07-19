"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";
import { z } from "zod";
import { useFormState } from "react-dom";

const fileSchema = z.object({
  type: z.string().refine((value) => value.includes("image"), {
    message: "이미지 파일만 업로드 가능합니다.",
  }),
  size: z.number().max(1024 * 1024 * 4, {
    message: "이미지 파일은 4MB 이하로 업로드 가능합니다.",
  }),
});

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    const result = fileSchema.safeParse(file);
    if (!result.success) {
      alert(
        result.error.flatten().fieldErrors.type ||
          result.error.flatten().fieldErrors.size
      );
      return;
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };
  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div>
      <form className="p-5 flex flex-col gap-5" action={action}>
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-cover bg-center"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {state?.error?.fieldErrors.photo}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.error?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="가격"
          errors={state?.error?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="자세한 설명"
          errors={state?.error?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
