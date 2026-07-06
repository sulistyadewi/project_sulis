"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { MdLogin } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  // const handleLogin = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   router.push("/dashboard/student");
  // };

  return (
    <div className="bg-linear-to-br from-indigo-950  to-[#070316] h-screen">
      <div className="mt-5 flex flex-col justify-center items-center">
        <div className="bg-[#615396] w-48 h-14 rounded-2xl flex items-center justify-center">
          <div className="capitalize bg-[#210f61] w-44 h-10 flex items-center justify-center rounded-xl font-semibold text-white">
            login
          </div>
        </div>
        <div className="mt-5 text-xl font-semibold ">
          <h1 className="text-white">Hello, Welcome to Our Website</h1>
        </div>
        <div className="mt-8 max-w-lg p-2">
          <form action="">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="capitalize text-indigo-50 text-sm mb-1"
              >
                email
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#3b3457] rounded-lg outline-1 focus:outline-2 focus:outline-indigo-200 w-[18rem] h-10 p-2 text-indigo-50"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                htmlFor=""
                className="capitalize text-indigo-50 text-sm mb-1"
              >
                password
              </label>
              <input
                type="password"
                placeholder="●●●●●●●●"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#3b3457] rounded-lg outline-1 focus:outline-2 focus:outline-indigo-200 w-[18rem] h-10 p-2 text-indigo-50"
              />
            </div>
            <div className="mt-6 flex text-center">
              <button className="bg-amber-500 w-full rounded-lg py-1.5 text-center flex justify-center items-center gap-2 text-black">
                <MdLogin className="text-xl" />
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
