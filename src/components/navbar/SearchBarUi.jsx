import { Box, CircularProgress, IconButton, InputBase, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import { SearchOutlined } from '@mui/icons-material'
import { searchValidationSchema } from './searchValidationSchema'

const SearchBarUi = (props) =>
{
    const { handleSearch, isLoadingSearch } = props;
    return (
        <Box 
        
        sx={{
            border: "2px solid black",
            borderRadius: 10,
            position: "relative",
            display: "flex",
            alignItems: "center",
            "@media (max-width:540px)":{
                display:"none"
            }
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
                                        width: 100,
                                        mr: 1,
                                        ".MuiOutlinedInput-notchedOutline ": {
                                            border: "none",
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
                                        width: 200,
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