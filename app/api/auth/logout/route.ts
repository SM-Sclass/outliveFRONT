import {NextResponse} from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully", status:200 });
    response.cookies.set("token", "", { path: "/", expires: new Date(0) });
    response.cookies.set("user", "", { path: "/", expires: new Date(0) });
    return response;
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error:error || "Unknown Error" }, { status: 500 });
  }
}