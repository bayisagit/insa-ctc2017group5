import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
    } = await req.json();

    const tx_ref = `${first_name}-${Date.now()}`; // unique ref

    const headers = {
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const body = {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      return_url: "http://localhost:3000/payment/success", // adjust to your site
    };

    const chapaRes = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      { headers }
    );

    return NextResponse.json(chapaRes.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json(
      { message: "Payment failed", error: error.message },
      { status: 400 }
    );
  }
}
