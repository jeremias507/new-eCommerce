import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/auth.scheme";
import { useAuth } from "../context/auth.context";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { signin, error, isAuthenticate } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    await signin(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto shadow-lg rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4">
            <img src={loginIcons} alt="login icons" />
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
          <form
            className="pt-6"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <div className="mt-1 relative shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
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
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <Link to="/forgot-password" className="text-sm  font-bold">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all mt-6"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <p className="text-base">
                Dont have an account?{" "}
                <Link to="/sign-up" className="font-bold hover:text-red-600">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
