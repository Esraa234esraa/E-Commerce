import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (localStorage
            .getItem("userToken")
            !== null) {
            setIsAuthenticated(jwtDecode(localStorage.getItem('userToken')));
        }
    }, [])


    return (
        <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </authContext.Provider>
    );
}
