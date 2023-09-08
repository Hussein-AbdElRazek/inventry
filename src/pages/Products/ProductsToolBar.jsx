import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { generateId } from '../../helpers/generateId';

const ProductsToolBar = (props) =>
{
    const { setRows, setRowModesModel } = props;

    const handleClickAddRecord = () =>
    {
        const id = generateId();
        setRows((oldRows) => [
            {
                id,
                productName: "",
                productSerialNumber: "",
                productQuantity: "",
                limit: "",
                productCategory: "",
                countryOfProductOrigin: "",
                productPrice: "",
                isNew: true
            },
            ...oldRows
        ]);
        setRowModesModel((oldModel) => ({
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'productName' }, ...oldModel
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClickAddRecord}>
                Add Product
            </Button>
        </GridToolbarContainer>
    );
}

export default ProductsToolBar