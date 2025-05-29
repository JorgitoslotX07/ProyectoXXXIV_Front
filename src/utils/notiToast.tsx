import { Bounce, toast, type ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
  // className: "bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-white shadow-md", // para el fondo del toast
  //   bodyClassName: "text-sm font-medium px-3 py-2",
};

export const mostrarError = (error: string) => toast.error(error, baseOptions);

export const mostrarInfo = (info: string) => toast.info(info, baseOptions);

export const mostrarWarning = (warning: string) =>
  toast.warn(warning, baseOptions);

export const mostrarSuccess = (success: string) =>
  toast.success(success, baseOptions);
