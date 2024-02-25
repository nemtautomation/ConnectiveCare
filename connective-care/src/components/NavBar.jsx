import React from "react";
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";

export function NavBar() {

    return(
        <Box sx={{ width: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        href=".."
                    >
                        <Typography color="#FFFFFF">ConnectiveCare</Typography>
                    </Button>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Button 
                        href="../SignIn"
                    >
                        <Typography color="#FFFFFF">Sign In</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}