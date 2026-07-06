"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiBookmarklet } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
// import { CiSearch } from "react-icons/ci";

export default function DashStudent() {
  const [isSideBar, setIsSideBar] = useState<boolean>(true);

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
                <button className="px-2 py-2 rounded-lg font-bold border-2 border-red-500">
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
          <div className="px-5 mt-8">
            <h1 className="uppercase font-bold text-2xl">dashboard Student</h1>
            <p className="text-sm text-[#c2bcd1] text-justify">
              "Ketekunan dan disiplin dalam belajar adalah kunci untuk meraih
              prestasi. <br /> Setiap usaha yang kamu lakukan hari ini akan
              memberikan hasil di masa depan."
            </p>
          </div>
          <div className="px-5 grid grid-cols-4 gap-4 mt-8 mb-8">
            <div className="mt-3 border border-[#2f245a] max-w-md rounded-xl bg-[#3a255f] p-4">
              <h2 className="text-violet-50">Tittle of Subject</h2>
              <p className="text-sm mt-4 text-[#ab98ce]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                illo provident maxime soluta modi. Eligendi, vel!
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
      </div>
    </div>
  );
}
