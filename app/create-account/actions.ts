"use server";

import { z } from "zod";

function checkUsername(username: string) {
  return !username.includes("admin");
}

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required",
      })
      .min(3, "Way too short!!")
      .max(10, " Way too long!!")
      .toLowerCase()
      .trim()
      .transform((username) => `${username}🇰🇷`)
      .refine(checkUsername, "Username cannot contain 'admin'"),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "Password too weak, must contain at least one uppercase letter, one lowercase letter, and one special character"
      ),
    confirm_password: z.string().min(10),
  }) //아래의 refine은 form 전체에 대한 refine임을 주의 confirm_password에 붙은 게 아님
  .refine(checkPasswords, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
}
