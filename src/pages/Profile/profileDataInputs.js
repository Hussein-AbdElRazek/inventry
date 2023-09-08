export const profileDataInputs = [
    {
        control: "input",
        type: "text",
        name: "bussinesName",
        label: "Business Name",
    },
    {
        control: "input",
        type: "text",
        name: "inventoryName",
        label: "Inventory Name",
    },
    {
        control: "input",
        type: "text",
        name: "bussinesIndustry",
        label: "Industry of Business",
    },
    {
        control: "input",
        type: "text",
        name: "userName",
        label: "User Name",
    },
    {
        control: "input",
        type: "email",
        name: "email",
        label: "Email",
    },
]
export const changePasswordDataInputs = [
    {
        control: "input",
        type: "password",
        name: "oldPassword",
        label: "Old Password",
    },
    {
        control: "input",
        type: "password",
        name: "password",
        label: "New Password",
    },
    {
        control: "input",
        type: "password",
        name: "confirmPassword",
        label: "Confirm New Password",
    },
]

export const profileInitialValues = {
    bussinesName: "",
    inventoryName: "",
    bussinesIndustry: "",
    userName: "",
    email: "",
}
export const changePasswordInitialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
}