import { useState } from "react";
import { Button, Dialog as DialogMUI, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, } from '@mui/material'

const Dialog = (props) =>
{
    const { open, onClose, title,  } = props;

    
    return (
        <DialogMUI open={true} onClose={onClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </DialogMUI>
    )
}

export default Dialog