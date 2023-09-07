import { useState, useContext, useCallback, } from "react";
import { useSnackbar } from "notistack";
import AuthContext from "../store/auth-context";
import { trimObject } from "../helpers/trimObject";

const useHttp = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const sendRequest = useCallback(async (requestConfig, applyData) =>
    {
        setIsLoading(true);
        try
        {
            const response =
                await fetch(`https://inventory-v9mc.onrender.com/${requestConfig.url}`, {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.token,
                        "Content-Type": "application/json",
                    },
                    body: requestConfig.body ?
                        JSON.stringify(trimObject(requestConfig.body)) :
                        null
                });
            const data = await response.json();
            applyData(data);
            if (!response.ok)
            {
                throw new Error(data.message || data.Message)
            }
            let message;
            if (data.message || data.msesage)
            {
                message = data.message || data.msesage;
                message = message.toLowerCase();
                if (message.includes("success")) { popMessage(message, { variant: "success" }) }
                else { popMessage(message, { variant: "info" }) }

            }
        } catch (error)
        {
            setIsLoading(false)
            setError(error.message || "Something went wrong")
            popMessage(error.message || "Something went wrong", { variant: "error" })
        }
        setIsLoading(false)
    }, [authCtx, popMessage])
    return {
        isLoading,
        sendRequest,
    }

}

export default useHttp;