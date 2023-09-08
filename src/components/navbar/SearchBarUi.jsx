import { Box, CircularProgress, IconButton, InputBase, MenuItem, TextField, useTheme } from '@mui/material'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import { SearchOutlined } from '@mui/icons-material'
import { searchValidationSchema } from './searchValidationSchema'

const SearchBarUi = (props) =>
{
    const { handleSearch, isLoadingSearch } = props;
    const theme = useTheme();

    return (
        <Box sx={{
            border: "2px solid black",
            borderRadius: 10,
            position: "relative",
            display: "flex",
            alignItems: "center"
        }}>
            <Formik
                initialValues={{ searchBy: "name", searchValue: "" }}
                validationSchema={searchValidationSchema}
                onSubmit={handleSearch}
            >
                {(formik) =>
                    <Form >
                        <Field name="searchBy">
                            {({ field }) =>
                            (
                                <TextField
                                    name="searchBy"
                                    defaultValue="name"
                                    select
                                    size='small'
                                    sx={{
                                        width: 90,
                                            mr: 0,
                                        // width: 50,
                                        // mr: 0,
                                        ".MuiOutlinedInput-notchedOutline ": {
                                            border: "none",
                                        },
                                        [theme.breakpoints.up('sm')]: {
                                            width: 100,
                                            mr: 1,
                                        },
                                    }}
                                    {...field}
                                >
                                    <MenuItem value="name">
                                        Name
                                    </MenuItem>
                                    <MenuItem value="category">
                                        category
                                    </MenuItem>
                                </TextField>
                            )
                            }
                        </Field>
                        <Field name="searchValue">
                            {({ field }) => (
                                <InputBase
                                    name="searchValue"
                                    placeholder="Search..."
                                    sx={{
                                        width: 60,
                                        // width: 40,
                                        [theme.breakpoints.up('sm')]: {
                                            width: 200,
                                        },
                                    }}
                                    {...field}
                                />
                            )}
                        </Field>

                        <IconButton disabled={isLoadingSearch} type="submit" color="primary" >
                            {isLoadingSearch ?
                                (<CircularProgress size={24} />)
                                :
                                (<SearchOutlined />)
                            }
                        </IconButton>


                    </Form>
                }
            </Formik>
        </Box>
    )
}

export default SearchBarUi