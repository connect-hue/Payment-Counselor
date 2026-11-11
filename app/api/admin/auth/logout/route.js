import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const forwardedProto = request.headers.get("x-forwarded-proto") || "";
    const isHttps =
      forwardedProto.split(",")[0].trim() === "https" ||
      request.url.startsWith("https://");
    const requestHost = (request.headers.get("host") || "").split(":")[0].toLowerCase();
    const cookieDomain = (process.env.COOKIE_DOMAIN || "").trim().toLowerCase();

    let cookieString = `token=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=${isHttps ? "None" : "Lax"}`;
    if (isHttps) {
      cookieString += "; Secure";
    }
    if (cookieDomain && cookieDomain !== "localhost" && requestHost.endsWith(cookieDomain)) {
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
