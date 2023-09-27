import { useSnackbar } from 'notistack';

import useHttp from "../../hooks/use-http";
import ForgetPasswordUi from "./ForgetPasswordUi"
import CloseBtnNotistack from '../ui/CloseBtnNotistack';

const ForgetPassword = (props) =>
{
    const { open, setOpen } = props;
    const handleClose = () =>
    {
        setOpen(false)
    }
    const {
        isLoading: isLoadingForgetPassword,
        sendRequest: forgetPassword
    } = useHttp();
    
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const handleForgetPassword = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                popMessage("Password reset successfully, new password send to your email", { variant: "success", action: CloseBtnNotistack, persist: true })
                handleClose()
            }
        };

        forgetPassword(
            {
                url: "forgetPassword",
                method: "post",
                body: values,
            },
            getResponse
        );
    }

    return (
        <ForgetPasswordUi
            open={open}
            handleClose={handleClose}
            handleForgetPassword={handleForgetPassword}
            isLoadingForgetPassword={isLoadingForgetPassword}
        />
    )
}

export default ForgetPassword