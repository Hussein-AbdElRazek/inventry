import { useCallback } from "react";
const useValidateOnProduct = () =>
{
    const validateOnProduct = useCallback(
        (product) =>
        {
            let allHasValue = true;
            for (const property in product) 
            {
                if (property === "id" || property === "isNew") continue;
                if ((typeof product[property] === "string" && product[property].trim() === '')
                )
                {
                    allHasValue = false;
                    break;
                }
            }
            if (!allHasValue)
            {
                return false;
            } else
            {
                return true;
            }
        }, []);
    return validateOnProduct;
}

export default useValidateOnProduct;