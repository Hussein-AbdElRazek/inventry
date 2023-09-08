import { Box, Button, Paper, useTheme } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { LoopOnInputs } from '../../helpers/LoopOnInputs';
import { profileDataInputs } from './profileDataInputs';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';

const ProfileUi = (props) =>
{
    const {
        profileData,
        isEdit,
        setIsEdit,
        handleEditProfile,
        isLoadingEditProfile,
        handleOpenChangePassword,
        handleLogout,
    } = props;
    const theme = useTheme();
    const handleCancelEdit = (resetForm) =>
    {
        resetForm();
        setIsEdit(false)
    }
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 2, pt: 10 }}
        >
            <Paper
                variant="outlined"
                sx={{
                    my: 5,
                    mx: 2,
                    px: 5,
                    py: 2,
                    position: "relative",
                    [theme.breakpoints.up('md')]: {
                        mx: 15,
                    },
                }}
            >

                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>

                    <AccountCircle sx={{ fontSize: 100, color: "grey", mb: 2 }} />
                </Box>
                <Formik
                    initialValues={profileData}
                    onSubmit={handleEditProfile}
                >
                    {(formik) => <Form>
                        <LoopOnInputs
                            inputs={profileDataInputs}
                            disabled={!isEdit}
                        />
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {!isEdit ? (
                                <>
                                    <Button onClick={() => setIsEdit(true)}>Edit Profile</Button>
                                    <Button onClick={handleOpenChangePassword}>Change Password</Button>
                                    <Button onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => handleCancelEdit(formik.resetForm)}>Cancel</Button>
                                    <LoadingButton loading={isLoadingEditProfile} type="submit" >Save Changes</LoadingButton>
                                </>
                            )
                            }
                        </Box>
                    </Form>}


                </Formik>
            </Paper>
        </Box>
    )
}

export default ProfileUi