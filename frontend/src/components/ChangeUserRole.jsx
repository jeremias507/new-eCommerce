import { IoMdClose } from "react-icons/io";
import { Role } from "../common/Role";
import { useState } from "react";
import { UpdateUserRequest } from "../api/index";
import { toast } from "react-toastify";

export const ChangeUserRole = ({ onClose, data, fetchAllUser }) => {
  const [userRole, setUserRole] = useState(data.role);

  const handleOnchangeSelected = (e) => {
    setUserRole(e.target.value);
  };
  
  const updateUserRole = async () => {
    try {
      const res = await UpdateUserRequest(data._id, {
        role: userRole,
      });
      if (res.data.success) {
        toast.success("User role updated successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
        onClose();
        fetchAllUser()
      } else {
        toast.error(res.data.message || "Error updating user role", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0  w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className=" mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>
          Name : {data.firstname} {data.lastname}{" "}
        </p>
        <p>Email : {data.email} </p>

        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnchangeSelected}
          >
            {Object.values(Role).map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};
