import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const response = await fetch(`${process.env.NEST_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from server:", errorData);
            return NextResponse.json({ error: errorData.message || "Login failed" }, { status: 401 });
        }

        const data = await response.json();
        const res = NextResponse.json(data, { status: 200 });
        res.cookies.set("token", data.access_token, {
            maxAge: Number(process.env.MAX_AGE_SESSION) || 86400,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })

        return res;
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
    }

}
