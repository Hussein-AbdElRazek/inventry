import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useHttp from '../../hooks/use-http';
import SignUpUi from './SignUpUi';
import CloseBtnNotistack from '../../components/ui/CloseBtnNotistack';

const SignUp = () =>
{
    const navigate = useNavigate();
    const {
        isLoading: isLoadingSignUp,
        sendRequest: signUp
    } = useHttp();

    const { enqueueSnackbar: popMessage } = useSnackbar();

    const handleSignUp = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success and your email was sent !")
            {
                popMessage("Sign up successfully and your verification email was sent", { variant: "success" , action: CloseBtnNotistack, persist: true })
                navigate("/login", { replace: true });
            }
        };
        signUp(
            {
                url: "signUp",
                method: "POST",
                body: values,
            },
            getResponse
        );
    }
    return (
        <SignUpUi
            isLoadingSignUp={isLoadingSignUp}
            handleSignUp={handleSignUp}
        />
    )
}

export default SignUp