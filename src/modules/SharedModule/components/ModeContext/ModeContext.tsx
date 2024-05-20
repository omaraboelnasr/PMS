import { createContext, useState } from 'react'

     export const ModeContext = createContext(null);

     export default function ModeContextProvider (props:any) {

       let [mode, setMode] = useState('')
       
       let [title, setTitle] = useState('')
       
       let [description , setDescription] = useState('')

         return (
             <ModeContext.Provider value={{ mode , setMode , title, setTitle , description , setDescription }}>
                 {props.children}
             </ModeContext.Provider>
      ) 
    }
