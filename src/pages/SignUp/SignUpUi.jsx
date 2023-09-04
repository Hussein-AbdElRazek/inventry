import React from 'react'
import { Link, Typography, Paper, Box, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { NavLink } from 'react-router-dom';

import FormContainer from '../../components/formik/FormContainer'
import { LoopOnInputs } from '../../helpers/LoopOnInputs';
import { signUpInitialValues, signUpInputs } from './signUpInputsData';
import { signUpValidationSchema } from './signUpValidationSchema';
import BigLogo from '../../components/ui/BigLogo';
import CenterXY from '../../components/ui/CenterXY';
const SignUpUi = (props) =>
{
  const { handleSignUp, isLoadingSignUp } = props;
  const theme = useTheme();

  return (
    <CenterXY>
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
        <BigLogo />
        <Typography color="primary" variant="h4" textAlign="center" mb={5}>Sign Up</Typography>
        <FormContainer
          initialValues={signUpInitialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSignUp}
        >
          <LoopOnInputs
            inputs={signUpInputs}
            disabled={isLoadingSignUp} />

          <Box
            sx={{ width: "100%", textAlign: "right" }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoadingSignUp}
              size='large'
            >
              Sign Up
            </LoadingButton>
          </Box>
          <Typography variant="body2" mt={2}>
            {"Have an account already? "}
            <Link component={NavLink} to="/login">
              Login
            </Link>
          </Typography>
        </FormContainer>
      </Paper >
    </CenterXY>
  )
}

export default SignUpUi