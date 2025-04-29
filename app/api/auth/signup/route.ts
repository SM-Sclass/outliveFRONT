import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, phone } = await request.json();

        const response = await fetch(`${process.env.NEST_ENDPOINT}/patient/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, phone }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from server:", errorData);
            return NextResponse.json({ error: errorData.message || "Signup failed" }, { status: 400 });
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 201 }); // No token setting
    } catch (error) {
        console.error("Error in signup POST request:", error);
        return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
    }
}
