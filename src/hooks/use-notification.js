import { useSnackbar } from "notistack";
import CloseBtnNotistack from "../components/ui/CloseBtnNotistack";

const useNotification = () =>
{
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const handleNotification = ({ limit, productQuantity, productName }) =>
    {
        if (limit >= productQuantity){
            popMessage(`${productName} quantity reach the limit of it.`, { variant: "info", action: CloseBtnNotistack, persist: true })
        }
    }
    return handleNotification
}
export default useNotification;