import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicOnly = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.userId) {
    if (!isPublicOnly) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isPublicOnly) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  //정규표현식으로 해당 경로는 미들웨어를 거치지 않게 설정
};
