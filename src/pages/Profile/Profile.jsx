import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import ProfileUi from './ProfileUi'
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import ChangePasswordUi from './ChangePasswordUi';
const Profile = () =>
{
    const navigate = useNavigate();
    const {
        isLoading: isLoadingEditProfile,
        sendRequest: editProfile
    } = useHttp();
    const {
        isLoading: isLoadingChangePassword,
        sendRequest: changePassword
    } = useHttp();
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const authCtx = useContext(AuthContext);
    const [profileData] = useState(authCtx.userData);
    const [isEdit, setIsEdit] = useState(false);

    const handleEditProfile = (values) =>
    {
        let submitData = {};
        for (const key in values)
        {
            if (values[key] !== profileData[key])
            {
                submitData[key] = values[key];
            }
        }
        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                authCtx.updateUserData(values);
                setIsEdit(false)
            }
        };
        editProfile(
            {
                url: "editProfile",
                method: "PATCH",
                body: submitData,
            },
            getResponse
        );
    }
    const handleChangePassword = (values) =>
    {

        const getResponse = ({ message }) =>
        {
            if (message === "success")
            {
                popMessage("Password changed successfully",
                    {
                        variant: "success"
                    })
                handleCloseChangePassword()
            }
        };
        changePassword(
            {
                url: "changePassword",
                method: "PATCH",
                body: values,
            },
            getResponse
        );
    }
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const handleCloseChangePassword = () =>
    {
        setIsChangePasswordOpen(false)
    }
    const handleOpenChangePassword = () =>
    {
        setIsChangePasswordOpen(true)
    }
    const handleLogout = () =>
    {
        authCtx.logOut();
        navigate("/login")
    }
    return (
        <>
            <ProfileUi
                profileData={profileData}
                handleEditProfile={handleEditProfile}
                isLoadingEditProfile={isLoadingEditProfile}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                handleOpenChangePassword={handleOpenChangePassword}
                handleLogout={handleLogout}
            />
            <ChangePasswordUi
                open={isChangePasswordOpen}
                handleClose={handleCloseChangePassword}
                handleChangePassword={handleChangePassword}
                isLoadingChangePassword={isLoadingChangePassword} />
        </>

    )
}

export default Profile