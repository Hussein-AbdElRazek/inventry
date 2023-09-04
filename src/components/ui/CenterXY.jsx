import { Box } from '@mui/material'
import React from 'react'

const CenterXY = ({ children }) =>
{
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight:"100vh",
            minWidth:"100hw",
        }} >
            {children}
        </Box>
    )
}

export default CenterXY