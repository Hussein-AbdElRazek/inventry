import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Link, Typography, Paper, Box, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import FormContainer from '../../components/formik/FormContainer'
import { loginInitialValues, loginInputs } from './loginInputsData'
import { loginValidationSchema } from './loginValidationSchema'
import BigLogo from '../../components/ui/BigLogo'
import Input from '../../components/formik/Input'
import CenterXY from '../../components/ui/CenterXY'
const LoginUi = (props) =>
{
    const { handleLogin, isLoadingLogin, handleOpenForgetPassword } = props;
    return (
        <CenterXY>
            <Paper
                variant="outlined"
                sx={{
                    position: "relative",
                    width: "300px",
                    p: 4,
                }}>
                <BigLogo />
                <Typography color="primary" variant="h4" textAlign="center" mb={5}>Login</Typography>
                <FormContainer
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                >
                    {loginInputs.map((input) => (
                        <Input
                            key={input.name}
                            {...input}
                            disabled={isLoadingLogin}
                        />
                    ))}
                    <Box sx={{ width: "100%", textAlign: "right", mb: 3, mt: -3, fontSize: 14 }}>
                        <Button variant="text" onClick={handleOpenForgetPassword} >
                            Forget password?
                        </Button>
                    </Box>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        loading={isLoadingLogin}
                    >
                        Login
                    </LoadingButton>
                    <Typography variant="body2" mt={2}>
                        {"Don't have an account? "}
                        <Link component={NavLink} to="/signup">
                            Sign Up
                        </Link>
                    </Typography>
                </FormContainer>
            </Paper>
        </CenterXY>
    )
}

export default LoginUi