"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiBookmarklet } from "react-icons/gi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";
// import { CiSearch } from "react-icons/ci";

export default function DashAdmin() {
  const [isSideBar, setIsSideBar] = useState<boolean>(true);
  const [iscontrolSubject, setIsControlSubject] = useState<boolean>(false);
  const [isControlUser, setIsControlUser] = useState<boolean>(false);

  // API url
  // https://sxocjsgvgdbokequbwiz.supabase.co

  // anon public
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4b2Nqc2d2Z2Rib2tlcXVid2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMjQ5NjgsImV4cCI6MjA5ODgwMDk2OH0.fgLGafTwkq1j1_0xYR_-kJGWsQg4_hqIhE8riAVeSRc

  // service_role
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4b2Nqc2d2Z2Rib2tlcXVid2l6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzIyNDk2OCwiZXhwIjoyMDk4ODAwOTY4fQ.NShxSfJVyusHUB8di5ZrKe6jITxcFwDxx6jjyUW7nqo

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
                quick actions
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex justify-between items-center hover:bg-violet-900 px-5 py-2 rounded-2xl">
                  <label htmlFor="" className="text-sm w-28">
                    Kelola Materi
                  </label>
                </div>
                <div className="flex justify-between items-center hover:bg-violet-900 px-5 py-2 rounded-2xl">
                  <label htmlFor="" className="text-sm w-28">
                    Kelola Pengguna
                  </label>
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
                <h2>Admin@mail.com</h2>
                <h2>Admin</h2>
              </div>
              <div>
                <button className="bg-[#563f80] px-2 py-2 rounded-full text-2xl">
                  <CgProfile stroke="white" />
                </button>
              </div>
              <div>
                <button className="px-2 py-2 rounded-lg font-bold border-2 border-red-500">
                  <LuLogOut className="text-red-400 font-semibold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ====== MAIN ====== */}
        <div
          className={
            isSideBar === false
              ? "w-full duration-300  ease-in-out transition-all"
              : "w-5/6 justify-self-end duration-300  ease-in-out transition-all"
          }
        >
          <div className="px-5 mt-8">
            <h1 className="uppercase font-bold text-2xl">dashboard admin</h1>
            <p className="text-sm text-[#c2bcd1]">
              Kelola materi dan pengguna dengan cepat.
            </p>
          </div>
          <div
            className={
              iscontrolSubject || isControlUser === true
                ? "hidden transition-all"
                : "px-5 flex gap-4 mt-5 transition-all"
            }
          >
            <button onClick={() => setIsControlSubject(true)}>
              <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                <h2 className="text-violet-50 font-semibold text-left">
                  Perbarui dan Tambah Materi
                </h2>
                <p className="text-sm mt-4 text-[#ab98ce]">
                  Perbarui dan tambah materi subjek disini
                </p>
                <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                <h3 className="text-sm mt-2 flex items-center gap-2 justify-end text-indigo-300">
                  Kelola Materi
                  <FaLongArrowAltRight />
                </h3>
              </div>
            </button>
            <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
              <h2 className="text-violet-50 font-semibold">
                Perbarui dan Tambahkan Izin Pengguna
              </h2>
              <p className="text-sm mt-4 text-[#ab98ce]">
                Kelola pengguna website disini!
              </p>
              <h4 className="border-b mt-4 border-[#4f437e]"></h4>
              <h3 className="text-sm mt-2 flex items-center gap-2 justify-end text-indigo-300">
                Kelola Pengguna
                <FaLongArrowAltRight />
              </h3>
            </div>
          </div>
          {/* ========== KELOLA MATERI ========== */}
          {iscontrolSubject && (
            <div className="px-5 mt-5 transition-all">
              <div>
                <form
                  action=""
                  className="flex flex-col bg-yellow-500 max-w-md p-4 rounded-xl"
                >
                  <div className="flex flex-col">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      className="bg-[#f8c024fd] p-2 outline-yellow-800 outline-1 focus:outline-yellow-300 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description</label>
                    <textarea name="" id=""></textarea>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Video URL</label>
                    <input
                      type="file"
                      className="bg-[#f8c024fd] p-2 outline-yellow-800 outline-1 focus:outline-yellow-300 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Image URL</label>
                    <input
                      type="file"
                      className="bg-[#f8c024fd] p-2 outline-yellow-800 outline-1 focus:outline-yellow-300 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Grade</label>
                    <input
                      type="text"
                      className="bg-[#f8c024fd] p-2 outline-yellow-800 outline-1 focus:outline-yellow-300 rounded-lg"
                    />
                  </div>
                </form>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsControlSubject(false)}
                    className="flex items-center"
                  >
                    <IoArrowBack /> Back
                  </button>
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-[#3b3457] w-[18rem] h-10 p-2 text-indigo-50 rounded-lg outline-1 outline-[#5c4e8f] focus:outline-2 focus:outline-indigo-200"
                  />
                </div>
                <div>
                  <button className="bg-amber-700 px-2 py-2 rounded-full">
                    <IoAdd className="font-bold text-xl" />
                  </button>
                </div>
              </div>
              {/* ======== CARD ======= */}
              <div className="grid grid-cols-4 gap-4 mt-8 mb-8">
                <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                  <h2 className="text-violet-50">Tittle of Subject</h2>
                  <p className="text-sm mt-4 text-[#ab98ce]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis illo provident maxime soluta modi. Eligendi, vel!
                  </p>
                  <div className="text-xs flex gap-3 items-center mt-3">
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                  </div>
                  <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                  <h3 className="text-sm mt-2">Timestamp</h3>
                </div>
                <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                  <h2 className="text-violet-50">Tittle of Subject</h2>
                  <p className="text-sm mt-4 text-[#ab98ce]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis illo provident maxime soluta modi. Eligendi, vel!
                  </p>
                  <div className="text-xs flex gap-3 items-center mt-3">
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                  </div>
                  <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                  <h3 className="text-sm mt-2">Timestamp</h3>
                </div>
                <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                  <h2 className="text-violet-50">Tittle of Subject</h2>
                  <p className="text-sm mt-4 text-[#ab98ce]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis illo provident maxime soluta modi. Eligendi, vel!
                  </p>
                  <div className="text-xs flex gap-3 items-center mt-3">
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                  </div>
                  <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                  <h3 className="text-sm mt-2">Timestamp</h3>
                </div>
                <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                  <h2 className="text-violet-50">Tittle of Subject</h2>
                  <p className="text-sm mt-4 text-[#ab98ce]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis illo provident maxime soluta modi. Eligendi, vel!
                  </p>
                  <div className="text-xs flex gap-3 items-center mt-3">
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                  </div>
                  <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                  <h3 className="text-sm mt-2">Timestamp</h3>
                </div>
                <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                  <h2 className="text-violet-50">Tittle of Subject</h2>
                  <p className="text-sm mt-4 text-[#ab98ce]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis illo provident maxime soluta modi. Eligendi, vel!
                  </p>
                  <div className="text-xs flex gap-3 items-center mt-3">
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                  </div>
                  <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                  <h3 className="text-sm mt-2">Timestamp</h3>
                </div>
                <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
                  <h2 className="text-violet-50">Tittle of Subject</h2>
                  <p className="text-sm mt-4 text-[#ab98ce]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis illo provident maxime soluta modi. Eligendi, vel!
                  </p>
                  <div className="text-xs flex gap-3 items-center mt-3">
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                    <h3 className="bg-amber-600 py-1 px-2 rounded-full capitalize">
                      category
                    </h3>
                  </div>
                  <h4 className="border-b mt-4 border-[#4f437e]"></h4>
                  <h3 className="text-sm mt-2">Timestamp</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
