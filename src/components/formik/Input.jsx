import React from "react";
import { Field } from "formik";
import { TextField, Tooltip } from "@mui/material";

function Input(props)
{
    const {
        label,
        name,
        type,
        disabled,
        ...rest
    } = props;


    return (
        <Field
            name={name}>
            {({ field, form }) =>
            {
                return (
                        <Tooltip title={form.values[name]}>
                            <TextField
                                name={name}
                                id={name}
                                type={type}
                                label={label}
                                disabled={disabled}
                                error={form.errors[name] && form.touched[name] ?
                                    true : false}
                                helperText={form.errors[name] && form.touched[name] ?
                                    form.errors[name] : " "}
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 1 }}
                                {...field}
                                {...rest}
                            />
                        </Tooltip>
                );
            }}
        </Field>
    );
}

export default Input;
