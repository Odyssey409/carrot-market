import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  userId?: number;
}

export async function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "carrot-session",
    password: process.env.COOKIE_PASSWORD!,
  });
}
