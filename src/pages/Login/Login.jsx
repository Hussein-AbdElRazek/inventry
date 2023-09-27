import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import LoginUi from './LoginUi'
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import ForgetPassword from '../../components/forgetPassword/ForgetPassword';

const Login = () =>
{
    const navigate = useNavigate();
    const {
        isLoading: isLoadingLogin,
        sendRequest: login
    } = useHttp();
    const authCtx = useContext(AuthContext);

    const [isForgetPasswordOpen, setIsForgetPasswordOpen] =  useState(false);

    const handleLogin = (values) =>
    {
        const getResponse = ({ message, token, user }) =>
        {
            if (message === "success")
            {
                authCtx.logIn(token, user)
                navigate("/", { replace: true });
            }
        };

        login(
            {
                url: "login",
                method: "post",
                body: values,
            },
            getResponse
        );
    }
    const handleOpenForgetPassword = () => {
        setIsForgetPasswordOpen(true);
    }
    return (
        <>
            <LoginUi
                handleLogin={handleLogin}
                isLoadingLogin={isLoadingLogin}
                handleOpenForgetPassword={handleOpenForgetPassword}
            />
            <ForgetPassword open={isForgetPasswordOpen} setOpen={setIsForgetPasswordOpen} />
        </>

    )
}

export default Login