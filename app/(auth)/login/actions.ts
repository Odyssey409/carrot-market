"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, "An account doesn't exist with this email."),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: unknown, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      errors: [], // Ensure errors array is always present
    };
  } else {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: {
        id: true,
        password: true,
      },
    });
    const passwordMatch = await bcrypt.compare(
      result.data.password,
      user!.password ?? ""
    );
    if (passwordMatch) {
      const session = await getSession();
      session.userId = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password"],
          email: [],
        },
      };
    }
  }
};
