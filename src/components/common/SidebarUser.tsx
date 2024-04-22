"use client";
import { Dispatch, SetStateAction, useState } from "react";

type MenuItem = {
  id: number;
  src: string;
  title: string;
  isNew?: boolean;
};

type Props = {
  menus: MenuItem[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarUser = ({
  menus,
  activeTab,
  setActiveTab,
  open,
  setOpen,
}: Props) => {
  const handleActiveTab = (id: number) => {
    setActiveTab(id);
    setOpen(false);
  };

  return (
    <div
      className={`w-72 z-10 bg-black-800 py-8 md:relative md:translate-x-0 duration-300 h-screen overflow-auto no-scrollbar fixed ${open ? "" : "-translate-x-full"}`}
    >
      <div className="flex justify-center py-3">
        <img src="/logos/cip-pro-small.png" className="max-w-[55%] h-12" />
      </div>

      <div className="flex md:hidden gap-x-4 pt-3 items-center justify-between">
        <div></div>
        <div
          className={` bg-neutral-800 cursor-pointer right-0 top-9 p-2 w-10 rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <img src="/icons/chevron-right-double.svg" className="" />
        </div>
      </div>
      <ul className="pt-6">
        {menus.map((Menu: MenuItem) => (
          <li
            key={Menu.id}
            className={`flex px-6 font-semibold py-3 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            mt-2 ${
              activeTab == Menu.id
                ? "bg-black-600 duration-200"
                : ""
            }`}
            onClick={() => handleActiveTab(Menu.id)}
          >
            <img
              src={`/icons/${Menu.src}`}
              className={`${
                activeTab == Menu.id
                  ? "bg-black-600 opacity-100 duration-200"
                  : "opacity-50"
              }`}
            />
            <span
              className={`${
                activeTab == Menu.id
                  ? "bg-black-600 opacity-100 duration-200"
                  : "opacity-50"
              }`}
            >
              {Menu.title}
            </span>
            {Menu.isNew && (
              <div className="inline-flex flex-1 justify-end">
                <div className="badge pulsate tracking-wider">NEW</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SidebarUser;
