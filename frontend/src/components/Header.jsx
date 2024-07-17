import { Logo } from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { Role } from "../common/Role";
export const Header = () => {
  const { dataUser, logout, isAuthenticate } = useAuth();
  const [menuDisplay, setMenuDisplay] = useState(false);
 

  const handleMenu = () => {
    setMenuDisplay(!menuDisplay);
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full  container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none  "
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600  flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            {isAuthenticate && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={handleMenu}
              >
                {dataUser?.profilepic ? (
                  <img
                    src={dataUser?.profilepic}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={dataUser?.firsname}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded border border-red-600  z-50 ">
                <nav>
                  {dataUser.role === Role.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 "
                      onClick={()=>setMenuDisplay(false)}
                    >
                      Admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>

            <div className=" bg-red-600 text-white rounded-full w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-xs">0</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {isAuthenticate ? (
              <button
                onClick={logout}
                className=" px-2 cursor-pointer py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className=" px-2 py-1 cursor-pointer rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
