import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab';

import FormContainer from '../../components/formik/FormContainer';
import Input from '../../components/formik/Input';
import { changePasswordDataInputs, changePasswordInitialValues } from './profileDataInputs';
import { changePasswordValidationSchema } from './profileDataValidationSchema';


const ChangePasswordUi = (props) =>
{
    const { open, handleClose, handleChangePassword, isLoadingChangePassword } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color="primary">Change Password</DialogTitle>
            <FormContainer
                initialValues={changePasswordInitialValues}
                validationSchema={changePasswordValidationSchema}
                onSubmit={handleChangePassword}
            >
                <DialogContent>
                    {
                        changePasswordDataInputs.map(input => (
                            <Input
                                key={input.name}
                                {...input}
                                disabled={isLoadingChangePassword}
                            />
                        ))
                    }
                </DialogContent>

                <DialogActions>
                    <Button
                        disabled={isLoadingChangePassword}
                        onClick={handleClose}
                    >
                        Cancel</Button>
                    <LoadingButton
                        disabled={isLoadingChangePassword}
                        loading={isLoadingChangePassword}
                        type="submit">
                        Confirm
                    </LoadingButton>
                </DialogActions>
            </FormContainer>

        </Dialog>
    )
}

export default ChangePasswordUi