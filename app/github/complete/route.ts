import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();

  const user = await db.user.findUnique({
    where: {
      github_id: id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.userId = user.id;
    await session.save();
    return redirect("/profile");
  }

  const newUser = await db.user.create({
    data: {
      github_id: id.toString(),
      avatar: avatar_url,
      username: login, // 이렇게 하면 이메일과 비밀번호로 회원가입한 사람의 아이디와 중복이 될 수 있어서 중복을 방지할 수 있는 조치를 취해야 한다.
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.userId = newUser.id;
  await session.save();
  return redirect("/profile");
}
