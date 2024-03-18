import { Sidebar } from "flowbite-react";
import { VscColorMode } from "react-icons/vsc";
import { MdDashboard } from "react-icons/md";

import { LuPackageOpen } from "react-icons/lu";
import { HiArrowSmRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Sidebar className="fixed bottom-0 w-full block sm:hidden">
        <Sidebar.Items className="rounded-none flex dark:bg-slate-900 w-full h-[50px] py-2 px-2">
          <Sidebar.ItemGroup className="px-0 py-0 w-full flex  justify-between">
            <NavLink to="/">
              <Sidebar.Item className="flex justify-between">
                <div className="flex gap-1 sm:gap-3">
                  <MdDashboard className="text-[32px]" />
                  {/* <p className="text-[22px] font-medium"> Dashboard</p> */}
                </div>
              </Sidebar.Item>
            </NavLink>
            <NavLink to="/products">
              <Sidebar.Item className="flex justify-start">
                <div className="flex gap-1 sm:gap-3">
                  <LuPackageOpen className="text-[32px]" />
                  {/* <p className="text-[22px] font-medium"> Products</p> */}
                </div>
              </Sidebar.Item>
            </NavLink>
            <NavLink to="/">
              <Sidebar.Item className="flex justify-between">
                <div className="flex gap-1 sm:gap-3">
                  <VscColorMode className="text-[32px]" />
                  {/* <p className="text-[22px] font-medium"> Theme</p> */}
                </div>
              </Sidebar.Item>
            </NavLink>
            <NavLink to="/login">
              <Sidebar.Item className="flex justify-start">
                <div className="flex gap-1 sm:gap-3">
                  <HiArrowSmRight className="text-[32px]" />

                  {/* <p className="text-[22px] font-medium"> Logout</p> */}
                </div>
              </Sidebar.Item>
            </NavLink>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Footer;
