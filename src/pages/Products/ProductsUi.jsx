import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from "notistack";
import { Box } from '@mui/material';
import
{
    Edit as EditIcon,
    DeleteOutlined as DeleteIcon,
    Save as SaveIcon,
    Close as CancelIcon,
} from '@mui/icons-material';
import
{
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridEditInputCell,
} from '@mui/x-data-grid';

import ProductsToolBar from './ProductsToolBar';
import useValidateOnProduct from './use-validateOnProduct';

const ProductsUi = (props) =>
{
    const {
        products,
        isLoadingGetAllProducts,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalNumberOfItems,
        handleAddProduct,
        errorAddProduct,
        handleUpdateProduct,
        errorUpdateProduct,
        handleDeleteProduct,
        errorDeleteProduct,
        isLoadingDeleteProduct,
    } = props;

    const [rows, setRows] = useState(products);
    const [rowModesModel, setRowModesModel] = useState({});

    const { enqueueSnackbar: popMessage } = useSnackbar();

    //set rows product form database
    useEffect(() =>
    {
        setRows(products)
    }, [products])

    const handleRowEditStop = (params, event) =>
    {
        if (params.reason === GridRowEditStopReasons.rowFocusOut)
        {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () =>
    {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () =>
    {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    //i store it for make current deleing item disabled
    const [idDeletingNow, setIdDeletingNow] = useState([])
    const handleDeleteClick = (id) => async () =>
    {
        setIdDeletingNow((prev) => [...prev, id]);
        const res = await handleDeleteProduct(id);
        if (res)
        {
            setRows((prev) => prev.filter((row) => row.id !== id));
        } else
        {
            popMessage(!!errorDeleteProduct ? errorDeleteProduct : "Something went wrong", { variant: "error" })
        }
        setIdDeletingNow((prev) => prev.filter(ele => ele !== id))
    };

    const handleCancelClick = (id) => () =>
    {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew)
        {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const validateOnProduct = useValidateOnProduct();

    const processRowUpdate = useCallback(
        async (newRow) =>
        {
            const dataIsValid = validateOnProduct(newRow);
            if (dataIsValid)
            {
                const submitData = { ...newRow };
                let res;
                delete submitData.id;
                if (newRow.isNew)
                {
                    delete submitData.isNew;
                    res = await handleAddProduct(submitData);
                    if (!res) throw new Error(!!errorAddProduct ? errorAddProduct : "Something went wrong");
                } else
                {
                    delete submitData.addedAt;
                    delete submitData.islimited;
                    res = await handleUpdateProduct(submitData, newRow.id)
                    if (!res) throw new Error(!!errorUpdateProduct ? errorUpdateProduct : "Something went wrong");
                }
                if (res)
                {
                    delete newRow.isNew
                    //TODO handle add id when zezo return it
                    return newRow;
                }

            } else
            {
                throw new Error("All fields required.")
            }
        },
        [handleAddProduct, validateOnProduct, errorAddProduct, errorUpdateProduct, handleUpdateProduct],
    );

    const handleRowModesModelChange = (newRowModesModel) =>
    {
        setRowModesModel(newRowModesModel);
    };
    const editCellNumberInput = (params) => (
        <GridEditInputCell
            {...params}
            inputProps={{
                min: 0,
            }}
        />
    );

    const columns = [
        {
            field: 'productName',
            headerName: 'Name',
            width: 180,
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'productSerialNumber',
            headerName: 'Serial Number',
            width: 180,
            editable: true,
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
            editable: true,
            renderEditCell: editCellNumberInput
        },
        {
            field: 'limit',
            headerName: 'Limit',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            renderEditCell: editCellNumberInput
        },
        {
            field: 'productCategory',
            headerName: 'Category',
            width: 180,
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'countryOfProductOrigin',
            headerName: 'Country of ProductOrigin',
            width: 180,
            editable: true,
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
            editable: true,
            renderEditCell: editCellNumberInput
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) =>
            {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode)
                {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        disabled={!!idDeletingNow.find((ele) => ele === id) && isLoadingDeleteProduct}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="error"
                        disabled={!!idDeletingNow.find((ele) => ele === id) && isLoadingDeleteProduct}
                    />,
                ];
            },
        },
    ];

    const handleProcessRowUpdateError = (error) =>
    {
        popMessage(error.message, { variant: "error" })
    }

    //handlePagination
    const [rowCountState, setRowCountState] = useState(pageSize);
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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    processRowUpdate={processRowUpdate}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    loading={isLoadingGetAllProducts}
                    pagination
                    paginationMode="server"
                    page={currentPage}
                    pageSize={pageSize}
                    pageSizeOptions={[10]}
                    rowCount={rowCountState}
                    rowsPerPageOptions={[10]}
                    onPaginationModelChange={handlePaginationModelChange}
                    slots={{
                        toolbar: ProductsToolBar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
        </Box>
    );
}
export default ProductsUi;