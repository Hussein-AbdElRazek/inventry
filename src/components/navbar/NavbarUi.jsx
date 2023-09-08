import { Box, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchBarUi from './SearchBarUi';
import { useNavigate } from 'react-router-dom';

const NavbarUi = (props) =>
{
    const { handleSearch, isLoadingSearch } = props;
    const navigate = useNavigate();
    return (
        <Paper variant="outlined" sx={{ position: "fixed", width: "100%", backgroundColor: "white", zIndex: 999, borderRadius: 0 }}>

            <Toolbar>
                <Typography
                    className='logo'
                    variant="h6"
                    noWrap
                    component="div"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    Inventory
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <SearchBarUi handleSearch={handleSearch} isLoadingSearch={isLoadingSearch} />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={() => { navigate("/profile") }}
                    color="primary"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </Paper>
    )
}

export default NavbarUi