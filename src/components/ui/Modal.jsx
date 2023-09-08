import React from "react";
import ModalMui from "@mui/material/Modal";
import { Box, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

function Modal(props)
{
    const { open, setOpen } = props;
    return (
        <ModalMui
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiModal-backdrop": {
                    backgroundColor: "rgba(68 68 68 / 74%)",
                    backdropFilter: "blur(0)",
                    webkitBackdropFilter: "blur(0)",
                },
                "& :focus-visible": {
                    outline: "none",
                },
            }}
        >
            <Box
                sx={{
                    borderRadius: 2,
                    p: 2,
                    maxWidth: "95%",
                    minWidth: 300,
                    minHeight: 100,
                    backgroundColor: "white"
                }}
            >
                <Box sx={{
                    width: "100%",
                    display: "Flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb:1
                }}>
                    <Typography>
                        Search Result
                    </Typography>
                    <IconButton color="primary" onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>
                <Box >
                    {props.children}
                </Box>
            </Box>
        </ModalMui>
    );
}

export default Modal;
