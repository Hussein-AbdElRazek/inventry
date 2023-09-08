import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react'
const SnackbarCloseButton = ({ snackbarKey }) =>
{
    const { closeSnackbar } = useSnackbar();
    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <CloseOutlined sx={{ color: "var(--white)" }} />
        </IconButton>
    );
}
const CloseBtnNotistack = (snackbarKey) => (< SnackbarCloseButton snackbarKey={snackbarKey} />)


export default CloseBtnNotistack