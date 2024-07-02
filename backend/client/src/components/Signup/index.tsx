"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2'
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Link
} from '@mui/material';
import axios from 'axios';

interface FormValues {
    
    email: string;
    password: string;
}

const SignupForm: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted', formValues.email , formValues.password);
        try {
            
            const res = await axios.post('/auth/user/signup',{
                formValues
            })
            console.log(res.data)
        } catch (error:any) {

            console.log(error.res.data.errors)

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:"w8" ,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 8 }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
              
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formValues.password}
                    onChange={handleInputChange}
                    required
                />
               
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/signin" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SignupForm;
