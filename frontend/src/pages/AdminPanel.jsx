import { useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Role } from "../common/Role";
export const AdminPanel = () => {
  const { dataUser } = useAuth();

  const navigate = useNavigate()
  
  useEffect(()=>{
    if(dataUser.role !== Role.ADMIN){
      navigate('/')
    }
  },[dataUser,navigate])

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex  hidden  ">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow ">
        <div className="h-32 flex justify-center items-center flex-col ">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {dataUser?.profilepic ? (
              <img
                src={dataUser?.profilepic}
                className="w-20 h-20 rounded-full object-cover "
                alt={dataUser?.firstname}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold ">
            {dataUser?.firstname} {dataUser?.lastname}

          </p>
          <p className="text-sm ">{dataUser?.role}</p>
        </div>

        <div>
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to={"all-users"}
              className="px-2 py-1 rounded hover:bg-slate-100 "
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-2 py-2 rounded hover:bg-slate-100 "
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2 ">
        <Outlet />
      </main>
    </div>
  );
};
