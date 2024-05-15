import { createContext } from "react";
import { toast } from "react-toastify";

export const ToastContext = createContext(null)
export function ToastContextProvider(props) {
    const getToastValue = (type, message) => {
        return toast[type](message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    return (
        <ToastContext.Provider value={{getToastValue}}>
            {props.children}
        </ToastContext.Provider>
    )
}