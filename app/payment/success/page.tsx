"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h1>
      <p className="text-green-800 mb-6">
        Thank you for your payment. Your transaction has been completed.
      </p>
      <Link href="/">
        <Button className="bg-green-600 text-white px-6 py-2 rounded-md">
          Go to Home
        </Button>
      </Link>
    </div>
  );
}
