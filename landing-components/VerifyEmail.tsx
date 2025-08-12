// 'use client';

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// // import { useUserStore } from "@/store/useUserStore";
// import { Loader2 } from "lucide-react";
// import { FormEvent, useRef, useState } from "react";
// import { useRouter } from "next/navigation";

// const VerifyEmail = () => {
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//   const inputRef = useRef<(HTMLInputElement | null)[]>([]);
//   const { loading, verifyEmail } = useUserStore();
//   const router = useRouter();

//   const handleChange = (index: number, value: string) => {
//     if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       // Move focus to next input if a character was entered
//       if (value !== "" && index < 5) {
//         inputRef.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRef.current[index - 1]?.focus();
//     }
//   };

//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const verificationCode = otp.join("");
//     try {
//       await verifyEmail(verificationCode);
//       router.push("/");  // Next.js routing
//     } catch (error) {
//       console.error(error);
//       // Optionally show user error feedback here
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen w-full bg-gray-50 dark:bg-gray-900 px-4">
//       <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
//         <div className="text-center">
//           <h1 className="font-extrabold text-2xl text-gray-900 dark:text-gray-100">
//             Verify your email
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Enter the 6 digit code sent to your email address
//           </p>
//         </div>
//         <form onSubmit={submitHandler}>
//           <div className="flex justify-between gap-2">
//             {otp.map((letter: string, idx: number) => (
//               <Input
//                 key={idx}
//                 ref={(el) => (inputRef.current[idx] = el)}
//                 type="text"
//                 maxLength={1}
//                 value={letter}
//                 onChange={(e) => handleChange(idx, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(idx, e)}
//                 className="md:w-12 md:h-12 w-10 h-10 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
//                 inputMode="text"
//                 pattern="[a-zA-Z0-9]"
//                 autoComplete="one-time-code"
//                 aria-label={`Verification code digit ${idx + 1}`}
//               />
//             ))}
//           </div>
//           {loading ? (
//             <Button disabled className="bg-orange-600 hover:bg-orange-700 mt-6 w-full text-white">
//               <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//               Please wait
//             </Button>
//           ) : (
//             <Button className="bg-orange-600 hover:bg-orange-700 mt-6 w-full text-white">
//               Verify
//             </Button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
