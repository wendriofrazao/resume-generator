import { useState } from "react";
import { useAuth } from "../hooks/userAuth.jsx";
 

export function EmailVerification () {
  const { user, verifyOtpCode, sendOtp } = useAuth(); 
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!user?.email) {
      setError("Usuário não encontrado.");
      setIsLoading(false);
      return;
    }

    const otp = code.join("");
    try {
      await sendOtp(user.email, 'verify')
      const res = await verifyOtpCode(user.email, otp); 
      if (res.ok) {
        console.log("Email verified!");
      } else {
        setError(res.message || "Invalid code.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>
    </div>
  );
}
