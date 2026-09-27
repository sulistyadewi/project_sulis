"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getDashboard } from "@/lib/authRole";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiBookmarklet } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import { ClassItem, ApiResponse } from "@/types/learning";
import Link from "next/link";

const getClasses = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/classes`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("gagal mengambil kelas");
  }

  const result = (await response.json()) as ApiResponse<ClassItem[]>;

  console.log(result, "ini result home");

  if (!result.success || !result.data) {
    throw new Error(result.message ?? "data kelas tidak tersedia");
  }
  return result.data;
};

export default async function DashStudent() {
  const [isSideBar, setIsSideBar] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  const router = useRouter();
  const classes = await getClasses();

  useEffect(() => {
    let isMounted = true;
    const checkUserRole = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!isMounted) return;
      if (!data.user || error) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const role = profile?.role === "admin" ? "admin" : "student";

      if (role !== "student") {
        router.replace(getDashboard(role));
        return;
      }

      setUserEmail(data.user.email ?? "");
      setCheckingAuth(false);
    };
    checkUserRole();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  if (checkingAuth === true) {
    return <div>Sedang Memeriksa Akun</div>;
  }

  return (
    <div className="bg-linear-to-br from-indigo-950  to-[#0f0720] relative min-h-screen ">
      {/* ====== SIDE BAR ===== */}
      {isSideBar && (
        <div
          className={
            isSideBar === true
              ? "absolute left-0 w-1/6 min-h-full bg-[#0f0720] duration-300  ease-in-out transition-all border-r border-[#4f437e]"
              : "w-0 duration-300  ease-in-out transition-all"
          }
        >
          <div className="flex flex-col justify-center p-3 mt-4">
            <div className="flex gap-2 items-center justify-center">
              <span className="bg-violet-700 text-xl px-2 py-2 rounded-xl">
                <GiBookmarklet stroke="white" />
              </span>
              <h1 className="">ReadNoteS</h1>
            </div>
            <div className="mt-8">
              <h3 className="uppercase text-xs font-light text-[#c2bcd1]">
                subjek
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex justify-between items-center hover:bg-violet-900 px-5 py-2 rounded-2xl">
                  <label htmlFor="" className="text-sm w-28">
                    Nama Subjek
                  </label>
                  <h4 className="text-sm text-amber-400">(1)</h4>
                </div>
                <div className="flex justify-between items-center hover:bg-violet-900 px-5 py-2 rounded-2xl">
                  <label htmlFor="" className="text-sm w-28">
                    Nama Subjek
                  </label>
                  <h4 className="text-sm text-amber-400">(1)</h4>
                </div>
                <div className="flex justify-between items-center hover:bg-violet-900 px-5 py-2 rounded-2xl">
                  <label htmlFor="" className="text-sm w-28">
                    Nama Subjek
                  </label>
                  <h4 className="text-sm text-amber-400">(1)</h4>
                </div>
                <div className="flex justify-between items-center hover:bg-violet-900 px-5 py-2 rounded-2xl">
                  <label htmlFor="" className="text-sm w-28">
                    Nama Subjek
                  </label>
                  <h4 className="text-sm text-amber-400">(1)</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid justify-items-stretch">
        {/* ====== NAVBAR ===== */}
        <div
          className={
            isSideBar === false
              ? "w-full z-50 duration-300  ease-in-out transition-all"
              : "w-5/6 right-0 z-50 justify-self-end duration-300  ease-in-out transition-all"
          }
        >
          <div className="flex justify-between items-center  px-4 py-5 border-b border-[#4f437e]">
            <div className="flex gap-3 items-center">
              <button onClick={() => setIsSideBar(!isSideBar)}>
                <FaBars />
              </button>

              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#3b3457] w-[18rem] h-10 p-2 text-indigo-50 rounded-lg outline-1 outline-[#5c4e8f] focus:outline-2 focus:outline-indigo-200"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col text-right text-sm">
                <h2>student@mail.com</h2>
                <h2>student</h2>
              </div>
              <div>
                <button className="bg-[#563f80] px-2 py-2 rounded-full text-2xl">
                  <CgProfile stroke="white" />
                </button>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  className="px-2 py-2 rounded-lg font-bold border-2 border-red-500"
                >
                  <LuLogOut className="text-red-400 font-semibold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ====== CARD ====== */}
        <div
          className={
            isSideBar === false
              ? "w-full duration-300  ease-in-out transition-all"
              : "w-5/6 justify-self-end duration-300  ease-in-out transition-all"
          }
        >
          {classes.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-slate-600 shadow-sm">
              Belum ada data kelas. Silahkan tambahkan data kelas terlebih
              dahulu
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
              {classes.map((item) => (
                <Link
                  key={item.id}
                  href={`/kelas/${item.grade_level}`}
                  className="group overflow-hidden rounded-xl bg-[#F0EAFA] shadow-sm transition hover:translate-y-1 hover-shadow-md"
                >
                  <div className="aspect-square bg-[#432A71]">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl font-bold text-[#9D7BE0]">
                        {item.grade_level}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {item.description ?? "Materi Belajar"}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-violet-700">
                      Lihat materi
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
