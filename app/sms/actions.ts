"use server";

export async function smsVerification(prevState: any, formData: FormData) {
  const data = {
    code: formData.get("code"),
  };
  console.log(data);
  return {
    errors: ["Invalid code", "Please try again"],
  };
}
