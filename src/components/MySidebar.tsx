import { Sidebar } from "flowbite-react";
import { VscColorMode } from "react-icons/vsc";
import { MdDashboard } from "react-icons/md";

import { LuPackageOpen } from "react-icons/lu";
import { HiArrowSmLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";

function MySidebar() {
  return (
    <div>
      <Sidebar className="w-52 fixed z-10 left-0 top-[60px]  min-h-[90.5vh] md:min-h-[90.5vh] lg:h-[91.4vh] rounded-none bg-slate-100 dark:bg-slate-900 pl-2 hidden sm:flex">
        <Sidebar.Items className="rounded-none flex flex-col dark:bg-slate-900 ">
          <Sidebar.ItemGroup className=" py-0 pt-12  flex flex-col gap-2">
            <NavLink to="/">
              <Sidebar.Item className="flex justify-start">
                <div className="flex gap-1 sm:gap-3">
                  <MdDashboard className="text-[32px]" />
                  <p className="text-[22px] font-medium"> Dashboard</p>
                </div>
              </Sidebar.Item>
            </NavLink>
            <NavLink to="/products">
              <Sidebar.Item className="flex justify-start">
                <div className="flex gap-1 sm:gap-3">
                  <LuPackageOpen className="text-[32px]" />
                  <p className="text-[22px] font-medium"> Products</p>
                </div>
              </Sidebar.Item>
            </NavLink>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup className="flex flex-col gap-2 pt-[57vh] md:pt-[57vh] lg:pt-[59vh] xl:pt-[50vh]">
            <Sidebar.Item className="flex justify-start">
              <div className="flex gap-1 sm:gap-3">
                <VscColorMode className="text-[32px]" />
                <p className="text-[22px] font-medium"> Theme</p>
              </div>
            </Sidebar.Item>
            <NavLink to="/login">
              <Sidebar.Item className="flex justify-start">
                <div className="flex gap-1 sm:gap-3">
                  <HiArrowSmLeft className="text-[32px]" />

                  <p className="text-[22px] font-medium"> Logout</p>
                </div>
              </Sidebar.Item>
            </NavLink>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default MySidebar;
