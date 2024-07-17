import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageTobase64  from "../helpers/imageTobase64";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/auth.scheme";
import { useAuth } from "../context/auth.context";
export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const [profilePic, setProfilePic] = useState(loginIcons);
  const { signup, error, isAuthenticate } = useAuth();

  const navigate = useNavigate();

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const base64Pic = await imageTobase64(file);
    setProfilePic(base64Pic);
    setValue("profilepic", base64Pic);
  };

  const onSubmit = async (data) => {
    await signup(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  return (
    <section id="register">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto shadow-lg rounded-lg">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={profilePic} alt="Profile" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 pb-4 pt-2 bg-slate-200 py-4 text-center absolute bottom-0 w-full cursor-pointer">
                  Upload Photo
                </div>
                <input
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          {Array.isArray(error) &&
            error.map((item, i) => (
              <p
                key={i}
                className="mx-auto mt-4 text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1 w-full max-w-sm"
              >
                {item}
              </p>
            ))}
          <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name:
                </label>
                <div className="mt-1 relative shadow-sm">
                  <input
                    required
                    name="firstname"
                    type="text"
                    placeholder="Enter first name"
                    {...register("firstname")}
                    className="block w-full px-3 py-2 bg-slate-200 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.firstname?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.firstname?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name:
                </label>
                <div className="mt-1 relative shadow-sm">
                  <input
                    required
                    name="lastname"
                    type="text"
                    placeholder="Enter last name"
                    {...register("lastname")}
                    className="block w-full px-3 py-2 bg-slate-200 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.lastname?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.lastname?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <div className="mt-1 relative shadow-sm">
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className="block w-full px-3 py-2 bg-slate-200 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <div className="mt-1 relative rounded-md shadow-sm flex">
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                    className="block w-full px-3 py-2 bg-slate-200 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <div
                    className="cursor-pointer bg-slate-200 flex items-center justify-center px-2 rounded-r-md"
                    onClick={togglePasswordVisibility}
                  >
                    <span className="text-xl text-gray-700">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                {errors.password?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password:
                </label>
                <div className="mt-1 relative rounded-md shadow-sm flex">
                  <input
                    required
                    name="confirmpassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password"
                    {...register("confirmpassword")}
                    className="block w-full px-3 py-2 bg-slate-200 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <div
                    className="cursor-pointer bg-slate-200 flex items-center justify-center px-2 rounded-r-md"
                    onClick={toggleConfirmPassword}
                  >
                    <span className="text-xl text-gray-700">
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                {errors.confirmpassword?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmpassword?.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all mt-6"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-base">
              Dont have an account?{" "}
              <Link to="/login" className="font-bold hover:text-red-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
