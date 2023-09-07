import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'productName',
        headerName: 'Name',
        width: 180,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'productSerialNumber',
        headerName: 'Serial Number',
        width: 180,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'productQuantity',
        headerName: 'Quantity',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'limit',
        headerName: 'Limit',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'productCategory',
        headerName: 'Category',
        width: 180,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'countryOfProductOrigin',
        headerName: 'Country of ProductOrigin',
        width: 180,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'productPrice',
        headerName: 'Price',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left',
    },
];
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

    //handlePagination
    const [rowCountState, setRowCountState] = useState(totalNumberOfItems);
    useEffect(() =>
    {
        setRowCountState((prevRowCountState) =>
            totalNumberOfItems !== undefined ? totalNumberOfItems : prevRowCountState,
        );
    }, [totalNumberOfItems, setRowCountState]);
    const handlePaginationModelChange = (params) =>
    {
        setCurrentPage(params.page)
        setPageSize(params.pageSize)
    }
    
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Box
                sx={{
                    height: 500,
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
                <DataGrid
                    rows={limitedProducts}
                    columns={columns}
                    loading={isLoadingGetLimitedProducts}

                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pagination
                    paginationMode="server"
                    page={currentPage}
                    pageSize={pageSize}
                    pageSizeOptions={[10]}
                    rowCount={rowCountState}
                    rowsPerPageOptions={[10]}
                    onPaginationModelChange={handlePaginationModelChange}
                />
            </Box>
        </Box>
    )
}

export default LimitedProductsUi