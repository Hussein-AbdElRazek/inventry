import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab';

import FormContainer from '../formik/FormContainer';
import Input from '../formik/Input';
import { forgetPasswordInitialValues } from './forgetPasswordData';
import { forgetPasswordValidationSchema } from './forgetPasswordValidationSchema';

const ForgetPasswordUi = (props) =>
{

    const { open, handleClose, handleForgetPassword, isLoadingForgetPassword } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color="primary">Forget Password</DialogTitle>
            <FormContainer
                initialValues={forgetPasswordInitialValues}
                validationSchema={forgetPasswordValidationSchema}
                onSubmit={handleForgetPassword}
            >
                <DialogContent>
                    <DialogContentText mb={2}>
                        Type your account email and new password will send to you.
                    </DialogContentText>

                    <Input
                        disabled={isLoadingForgetPassword}
                        type="email"
                        name="email"
                        label="Email" />
                </DialogContent>

                <DialogActions>
                    <Button
                        disabled={isLoadingForgetPassword}
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <LoadingButton
                        disabled={isLoadingForgetPassword}
                        loading={isLoadingForgetPassword}
                        type="submit">
                        Confirm
                    </LoadingButton>
                </DialogActions>
            </FormContainer>

        </Dialog>
    )
}

export default ForgetPasswordUi