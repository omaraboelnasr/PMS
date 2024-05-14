import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let AuthContext=createContext(null);

export default function AuthContextProvider(props:any){
  const loginInfoFromLocal=localStorage.getItem("token");
  const baseUrl="https://upskilling-egypt.com:3003/api/v1/";
  const requestHeader={Authorization: `Bearer ${loginInfoFromLocal}`} ;

  const [loginInfo,setLoginInfo]=useState();

  let getloginInfo=()=>{
      const decodeToken=jwtDecode(loginInfoFromLocal);
      setLoginInfo(decodeToken);

  }

  useEffect(()=>{
    if(loginInfoFromLocal){

      getloginInfo();
    }
  },[])

return <><AuthContext.Provider value={{loginInfo,requestHeader,baseUrl,getloginInfo}}> {props.children}</AuthContext.Provider></>
}
