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
    Link,
    useRadioGroup
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface FormValues {

    email: string;
    password: string;
}

const SignupForm: React.FC = () => {

    const router = useRouter();

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
        console.log('Form submitted', formValues.email, formValues.password);
        const email = formValues.email;
        const password = formValues.password
        try {

            const res = await axios.post('/auth/user/signup', {
                email, password
            })
            console.log(res)
            // router.push('/')
        } catch (error: any) {

            console.log(error)
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
                const errorMessages = error.response.data.errors.map((error: any) => error.message);
                const errorMessage = errorMessages.join('\n'); // Concatenate messages with newline
    
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again later.",
                });
            }
            

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

