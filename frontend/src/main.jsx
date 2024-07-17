import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.context.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
  // </React.StrictMode>
);
