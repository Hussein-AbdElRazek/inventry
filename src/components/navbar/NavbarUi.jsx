import {  Box, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';


const NavbarUi = () =>
{
    return (
        <Paper variant="outlined" sx={{position:"fixed", width:"100%", backgroundColor:"white", zIndex:999, borderRadius:0}}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="primary"
                >
                    Inventory
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={() => { }}
                    color="primary"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </Paper>
    )
}

export default NavbarUi