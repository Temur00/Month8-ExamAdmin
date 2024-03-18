import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { MainLogo } from "../assets";

// dark:text-slate-200 text-slate-900
// dark:bg-slate-200 bg-slate-900

function Header() {
  return (
    <Navbar
      fluid
      className="fixed z-10 top-0 left-0 right-0  bg-slate-100 dark:bg-slate-900"
    >
      <Navbar.Brand>
        <Link className="flex" to={"/"}>
          <img src={MainLogo} className="mr-3 h-8   w-10 sm:h-10" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl sm:text-3xl font-semibold dark:text-slate-200 text-slate-900 ">
            Avion Admin
          </span>
        </Link>
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        <span className=" text-lg md:text-xl mr-2 dark:text-slate-200 text-slate-900 hidden sm:flex">
          Bonnie Green
        </span>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
              className="w-[32px] h-[32px] "
            />
          }
        >
          <div className="bg-slate-100 dark:bg-slate-800 rounded px-2">
            <Dropdown.Header>
              <span className=" text-sm mr-2 sm:hidden font-medium dark:text-slate-200 text-slate-900  ">
                Bonnie Green
              </span>
              <span className="block pt-2 truncate text-sm font-medium dark:text-slate-200 text-slate-900">
                Email: name@flowbite.com
              </span>
              <span className="block truncate text-sm font-medium dark:text-slate-200 text-slate-900">
                Password: ******
              </span>
            </Dropdown.Header>
            <NavLink to="/profile -pt-2">
              <Dropdown.Item className="dark:text-slate-200 text-slate-900">
                Profile
              </Dropdown.Item>
            </NavLink>
            <NavLink to="/login">
              <Dropdown.Item className="dark:text-slate-200 text-slate-900">
                Logout
              </Dropdown.Item>
            </NavLink>
          </div>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default Header;

// Sign in or image in 1:17:07
