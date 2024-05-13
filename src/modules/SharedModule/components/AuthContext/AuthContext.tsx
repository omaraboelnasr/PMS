
import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'

     export const AuthContext = createContext(null);

     export default function AuthContextProvider (props:any) {

         const [loginData, setLoginData] = useState('');

         let baseUrl = 'https://upskilling-egypt.com:3003/api/v1'

         const saveLoginData = () => {
             const encodedCode:any = localStorage.getItem('token');
             const decodedCode:any = jwtDecode(encodedCode);
             setLoginData(decodedCode);
         };

          useEffect(() => {
        if (localStorage.getItem('token'))
            saveLoginData();
          }, [])
         
         return (
             <AuthContext.Provider value={{ loginData, saveLoginData , baseUrl }}>
                 {props.children}
             </AuthContext.Provider>
      ) 
    }



    
