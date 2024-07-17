import { createContext, useContext, useState, useEffect } from "react";
import {
  RegisterRequest,
  LoginRequest,
  UserDetailsRequest,
  logoutRequest,
} from "../api";
import { toast } from "react-toastify";
// import { verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState({});
  const [error, setError] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const signup = async (data) => {
    try {
      if (data.password !== data.confirmpassword) {
        setError(["The passwords do not match"]);
        return;
      }
      const res = await RegisterRequest(data);

      if (res.data.success) {
        setIsAuthenticate(true);
        fetchUserDetails();

        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network Error", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      setError(error.response.data.message);
    }
  };

  const signin = async (data) => {
    try {
      const res = await LoginRequest(data);
      if (res.data.success) {
        setIsAuthenticate(true);
        fetchUserDetails();
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network Error", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      setError(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutRequest();
      if (res.data.success) {
        Cookies.remove("token");
        setDataUser({});
        setIsAuthenticate(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (!error) {
        toast.error("Network Error", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await UserDetailsRequest();
      if (res.data.success) {
        setDataUser(res.data.data);
        setIsAuthenticate(true);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const cookies = Cookies.get();
  //     if (!cookies.token) {
  //       setIsAuthenticate(false);
  //       setLoading(false);
  //       return;
  //     }
  //     try {
  //       const res = await verifyTokenRequest(cookies.token);
  //       console.log(res);
  //       if (!res.data) return setIsAuthenticate(false);
  //       setIsAuthenticate(true);
  //       setDataUser(res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setIsAuthenticate(false);
  //       setLoading(false);
  //     }
  //   };
  //   checkLogin();
  // }, []);

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  const handleAxiosError = (error) => {
    if (!error.response) {
      toast.error("Network Error", {
        position: "bottom-right",
      });
    } else {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        error,
        setError,
        dataUser,
        isAuthenticate,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
