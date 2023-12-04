import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firestore";
import { signOut } from "firebase/auth";


const authContext = createContext();

const useAuth = () => {
    const value = useContext(authContext);
    return value;
}

const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUserName(user.displayName);
                setUserId(user.uid);
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }
        })
    }, []);

    const handleLogOut = () => {
        
        signOut(auth)
        .then(() => {
            setIsAuthenticated(false);
            setLoggedOut(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    return (
        <authContext.Provider value={{ isAuthenticated, userId, setUserId, userName, handleLogOut, loggedOut, setLoggedOut, setUserName }}>
            { children }
        </authContext.Provider>
    )

}

export { useAuth, AuthContextProvider }