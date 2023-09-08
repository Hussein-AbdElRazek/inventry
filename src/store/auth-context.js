import React, { useState } from "react";

const AuthContext = React.createContext({
    userData: {},
    token: '',
    isLoggedIn: false,
    logIn: (token) => { },
    logOut: () => { },
    updateUserData: () => { },
})

export const AuthContextProvider = (props) =>
{
    const initialToken = localStorage.getItem("token");
    const initialUserData = JSON.parse(localStorage.getItem("userData"));
    const [token, setToken] = useState(initialToken);
    const [userData, setUserData] = useState(initialUserData);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!initialToken)

    const loginHandler = (token, user) =>
    {
        setToken(token)
        setUserData(user)
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        setUserIsLoggedIn(true)
    }

    const logOutHandler = () =>
    {
        setToken(null);
        setUserData(null);
        setUserIsLoggedIn(false);
        localStorage.clear()
    }

    const updateUserDataHandler = (data)=>{
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
    }
    const contextValue = {
        userData: userData,
        token: token,
        isLoggedIn: userIsLoggedIn,
        logIn: loginHandler,
        logOut: logOutHandler,
        updateUserData: updateUserDataHandler,
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;