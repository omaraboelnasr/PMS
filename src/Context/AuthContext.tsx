import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "../../node_modules/jwt-decode";

export let AuthContext=createContext(null);

export default function AuthContextProvider(props:any){
  
  const baseUrl="https://upskilling-egypt.com:3003/api/v1/";
  const requestHeader={Authorization: `Bearer ${localStorage.getItem("token")}`} ;
  //const requestHeader={Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5MSwicm9sZXMiOlsiY2FuQ2hhbmdlUGFzc3dvcmQiLCJjYW5HZXRDdXJyZW50VXNlciIsImNhblVwZGF0ZVVzZXIiLCJFbXBsb3llZSJdLCJ1c2VyTmFtZSI6Im1vaXNzYTEiLCJ1c2VyRW1haWwiOiJteWFoeWFpc3NhOTVAZ21haWwuY29tIiwidXNlckdyb3VwIjoiRW1wbG95ZWUiLCJpYXQiOjE3MTU3MjM1NzAsImV4cCI6MTcxOTMyMzU3MH0.kKIsgmpo4jENWcPVnjtqZIeAIDgDja0kaYXZgEWDwIBiOs0KpnZ59SfxR_7g84EBD4wMV-NOsP9Bx6l9g_kYCgWfmYSDjDYjpPWoTeugC_DOLlqA8EHjrT4dHwr_tJxZ8yimw8OLWd1JqLH5Mt0A0SqPDJdPlLbWqZUXeRhcS8r0zuZXDc8me9Qgd7znjCwXdRPMJvym4aoTaUjMvSR1IIIugGULw0rGo716AKQNynUu7kb2sUQ9d3VZ55SuoYhhcVjxnQ9ntryUtlcuzoWJv3g3iSwG2C3NlDhyyRi8fzldjqygh3PJwtq61icaiGqLPtt1_koPCV3ZtVPlPq_ZQg`} ;

  const [loginInfo,setLoginInfo]=useState();

  let getloginInfo=()=>{
    let tokenInfo=localStorage.getItem("token");
      const decodeToken=jwtDecode(tokenInfo);
      setLoginInfo(decodeToken);

  }

  useEffect(()=>{
    if(localStorage.getItem("token")){

      getloginInfo();
    }
  },[])

return <><AuthContext.Provider value={{loginInfo,requestHeader,baseUrl,getloginInfo}}> {props.children}</AuthContext.Provider></>
}
