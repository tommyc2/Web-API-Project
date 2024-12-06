import React from 'react'
import {useAuth} from '@clerk/clerk-react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Typography, Box, Button } from "@mui/material"
import Grid from "@mui/material/Grid2";

const AuthenticationCheck = () => {

    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <Typography variant="h2">Loading....</Typography>
    }

    if (!isSignedIn){

        return (
            <Grid container justifyContent="center" alignItems="center" marginTop={5} spacing={2}> 
                <Grid size={12}>
                    <Typography variant='h2' style={{textAlign: "center", marginBottom: '10px' }}>Please sign-in or sign-up</Typography>
                </Grid>

                <Link to="/sign-in">
                    <Button color="primary" variant="contained">
                        Log In
                    </Button>
                </Link>

                <Link to="/sign-up">
                    <Button color="primary" variant="contained">
                        Sign Up
                    </Button>
                </Link>

            </Grid>
        );
    }

    return <Outlet />

    
}

export default AuthenticationCheck;