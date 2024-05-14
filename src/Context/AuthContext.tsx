import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "../../node_modules/jwt-decode";

export let AuthContext=createContext(null);

export default function AuthContextProvider(props:any){
  
  const baseUrl="https://upskilling-egypt.com:3003/api/v1/";
  const requestHeader={Authorization: `Bearer ${localStorage.getItem("token")}`} ;

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
