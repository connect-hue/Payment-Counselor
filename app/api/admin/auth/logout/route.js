import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieDomain = process.env.COOKIE_DOMAIN || "";

    let cookieString = `token=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=${isProduction ? "None" : "Lax"}`;
    if (isProduction) {
      cookieString += "; Secure";
    }
    if (cookieDomain && cookieDomain !== "localhost") {
      cookieString += `; Domain=${cookieDomain}`;
    }

    const response = NextResponse.json(
      { message: "Logout successful." },
      { status: 200 }
    );

    response.headers.append("Set-Cookie", cookieString);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during logout." },
      { status: 500 }
    );
  }
}
