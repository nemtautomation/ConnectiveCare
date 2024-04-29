import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import Cookies from 'js-cookie';

export function NavBar() {

    const navigate = useNavigate();

    const useSignOut = () => {
        Cookies.remove('status');
        Cookies.remove('name');
        Cookies.remove('type');
    
        navigate("/");
    }

    return(
        <Box sx={{ width: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        href=".."
                    >
                        <Typography color="#FFFFFF">ConnectiveCare</Typography>
                    </Button>
                    {Cookies.get('type') == "user" ?
                    <Button
                        href="../UserDashboard"
                    >
                        <Typography color="#FFFFFF">Dashboard</Typography>
                    </Button>
                    :
                    <Box></Box>
                    }
                    {Cookies.get('type') == "provider" ?
                    <Button
                        href="../ProviderDashboard"
                    >
                        <Typography color="#FFFFFF">Dashboard</Typography>
                    </Button>
                    :
                    <Box></Box>
                    }
                    <Box sx={{ flexGrow: 1 }}></Box>
                    {Cookies.get('status') ?
                    <Button 
                        onClick={useSignOut}
                    >
                        <Typography color="#FFFFFF">Sign Out</Typography>
                    </Button>
                    :
                    <Box>
                        <Button 
                            href="../SignIn"
                        >
                            <Typography color="#FFFFFF">Sign In</Typography>
                        </Button>
                        <Button 
                            href="../SignUp"
                        >
                            <Typography color="#FFFFFF">Sign Up</Typography>
                        </Button>
                    </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}