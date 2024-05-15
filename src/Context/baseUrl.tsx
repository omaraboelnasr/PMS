import { createContext } from "react";

export const APIcontext = createContext(null)

export function APIcontextProvider(props){
    const baseUrl =`https://upskilling-egypt.com:3003/api/v1`;
    return (
        <APIcontext.Provider value={{baseUrl}}>
            {props.children}
        </APIcontext.Provider>
    )
}

