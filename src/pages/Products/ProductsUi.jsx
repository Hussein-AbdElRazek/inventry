import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import
{
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props)
{
    const { setRows, setRowModesModel } = props;

    const handleClick = () =>
    {
        const id = new Date().toISOString;
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

const ProductsUi = (props) =>
{
    const {products} = props;
    const [rows, setRows] = React.useState(products);
    const [rowModesModel, setRowModesModel] = React.useState({});
    React.useEffect(()=>{
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

    const handleDeleteClick = (id) => () =>
    {
        setRows(rows.filter((row) => row.id !== id));
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

    const processRowUpdate = (newRow) =>
    {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) =>
    {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'productName',
            headerName: 'Name',
            width: 180,
            editable: true,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'productSerialNumber', 
            headerName: 'Serial Number', 
            width: 180, 
            editable: true, 
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'productQuantity',
            headerName: 'Quantity',
            type: 'number',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'limit',
            headerName: 'Limit',
            type: 'number',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'productCategory',
            headerName: 'Category',
            width: 180,
            editable: true,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'countryOfProductOrigin',
            headerName: 'Country of ProductOrigin',
            width: 180,
            editable: true,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'productPrice',
            headerName: 'Price',
            type: 'number',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            editable: true,
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
                        color="primary"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="error"
                    />,
                ];
            },
        },
    ];

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
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
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