import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session?.userId) {
    const user = await db.user.findUnique({
      where: { id: session?.userId },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button>Logout</button>
      </form>
    </div>
  );
}
