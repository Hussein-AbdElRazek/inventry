import useHttp from "../../hooks/use-http";
import ForgetPasswordUi from "./ForgetPasswordUi"

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
    const handleForgetPassword = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
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