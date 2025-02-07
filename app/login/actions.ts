"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState, formData);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["Invalid email or password", "Please try again"],
  };
};
