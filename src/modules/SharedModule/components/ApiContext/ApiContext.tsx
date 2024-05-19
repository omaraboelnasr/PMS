
import { createContext } from 'react'

     export const ApiContext = createContext(null);

     export default function ApiContextProvider (props:any) {

         let baseUrl = 'https://upskilling-egypt.com:3003/api/v1'
         
         let authorization = `Bearer ${localStorage.getItem('token')}`

         return (
             <ApiContext.Provider value={{ baseUrl , authorization }}>
                 {props.children}
             </ApiContext.Provider>
      ) 
    }



    
