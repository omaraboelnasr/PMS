
import { createContext } from 'react';
import { toast } from "../../node_modules/react-toastify";
import "react-toastify/dist/ReactToastify.css";

export let ToastContext = createContext(null);

export default function ToastContextProvider(props: any) {

  let getToasterValue = (typ: any, message: any) => {
    return toast[typ](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }
  return (


    <ToastContext.Provider value= {{ getToasterValue }
}>
  { props.children }
  </ToastContext.Provider>
 
  );
}
