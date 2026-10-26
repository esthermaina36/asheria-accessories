
import { NextResponse } from "next/server";

export async function GET() {
  const consumerKey = process.env.DARAJA_CONSUMER_KEY;
  const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
  const environment = process.env.DARAJA_ENV;

  if (!consumerKey || !consumerSecret || environment !== "sandbox") {
    return NextResponse.json(
      { success: false, message: "Daraja sandbox configuration is missing." },
      { status: 500 }
    );
  }

  try {
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Daraja token request failed:", response.status);

      return NextResponse.json(
        {
          success: false,
          message: "Daraja authentication failed. Check your sandbox keys.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!data.access_token) {
      return NextResponse.json(
        { success: false, message: "Daraja did not return an access token." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Daraja sandbox authentication successful.",
    });
  } catch (error) {
    console.error("Daraja connection error:", error);

    return NextResponse.json(
      { success: false, message: "Could not connect to Daraja." },
      { status: 502 }
    );
  }
}
