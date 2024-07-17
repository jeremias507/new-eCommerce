import { useEffect, useState } from "react";
import { AllUserRequest } from "../api";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { ChangeUserRole } from "../components/ChangeUserRole";
export const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    _id: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const onClose = () => {
    setOpenUpdateRole(false);
  };

  const fetchAllUser = async () => {
    try {
      const res = await AllUserRequest();
      if (res.data.success) {
        setAllUser(res.data.data);
      }
    } catch (error) {
      toast.error("Network Error", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full bg-white border ">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-base font-medium border">Sr</th>
            <th className="text-base font-medium border">Name</th>
            <th className="text-base font-medium border">Email</th>
            <th className="text-base font-medium border">Role</th>
            <th className="text-base font-medium border">Created Date</th>
            <th className="text-base font-medium border">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUser.map((item, i) => {
            return (
              <tr key={i}>
                <td className="border text-base text-center">{i + 1}</td>
                <td className="border text-base text-center">
                  {item?.firstname} {item?.lastname}
                </td>
                <td className="border text-base text-center">{item?.email}</td>
                <td className="border text-base text-center">{item?.role}</td>
                <td className="border text-base text-center">
                  {moment(item?.createdAt).format("LL")}
                </td>
                <td className="border text-base text-center">
                  <button
                    className="bg-green-300 rounded-lg p-2 cursor pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setOpenUpdateRole(true);
                      setUpdateUserDetails(item);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={onClose}
          data={updateUserDetails}
          fetchAllUser={fetchAllUser}
        />
      )}
    </div>
  );
};
