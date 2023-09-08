import { Box } from "@mui/material"

import ProductTable from "../../components/ProductTable";


const LimitedProductsUi = (props) =>
{
    const {
        limitedProducts,
        isLoadingGetLimitedProducts,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalNumberOfItems,
    } = props;


    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Box
                sx={{
                    height: 400,
                    width: '90%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                    backgroundColor: "white",
                    mt: 5,
                    ".MuiDataGrid-columnHeaders": {
                        backgroundColor: "rgb(249, 250, 251)",
                        borderTop: "1px solid rgba(224, 224, 224, 1)"
                    }
                }}
            >
                <ProductTable
                    rows={limitedProducts}
                    isLoading={isLoadingGetLimitedProducts}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalNumberOfItems={totalNumberOfItems}
                />
            </Box>
        </Box>
    )
}

export default LimitedProductsUi