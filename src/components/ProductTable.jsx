import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid"

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
const ProductTable = (props) =>
{
    const {
        rows,
        isLoading,
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
        <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}

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
            sx={{maxHeight:"400px", minHeight:300}}
        />
    )
}

export default ProductTable