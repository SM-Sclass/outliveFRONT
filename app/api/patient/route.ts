import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Checking authorization
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    const patientBody = await request.json();

    // New Patient Body we will send
    const newPatientBody = {
      name: patientBody.name,
      email: patientBody.email,
      phone: patientBody.phone,
      password: patientBody.password,
      address: patientBody.address,
      age: patientBody.age,
      gender: patientBody.gender,
      blood_group: patientBody.blood_group,
      height: patientBody.height,
      weight: patientBody.weight,
      bmi: patientBody.BMI,
      status: patientBody.status,
      form_data: patientBody.form_data || null, // Include form_data if provided
    };

    const response = await fetch(`${process.env.NEST_ENDPOINT}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPatientBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      return NextResponse.json({ error: errorData.message || "Patient creation failed" }, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error in POST /api/patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
