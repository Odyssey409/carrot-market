"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function checkUsername(username: string) {
  return !username.includes("admin");
}

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required",
      })

      .toLowerCase()
      .trim()
      //.transform((username) => `${username}🇰🇷`)
      .refine(checkUsername, "Username cannot contain 'admin'")
      .refine(checkUniqueUsername, "This username is already taken"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        checkUniqueEmail,
        "This account already registered with this email"
      ),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  }) //아래의 refine은 form 전체에 대한 refine임을 주의 confirm_password에 붙은 게 아님
  .refine(checkPasswords, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);
    //login user
    const cookie = await getIronSession(cookies(), {
      cookieName: "carrot-session",
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-expect-error 타입 정의 안되어있음
    cookie.userId = user.id;
    await cookie.save();
    redirect("/profile");
  }
}
