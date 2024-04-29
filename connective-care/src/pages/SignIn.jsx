import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { userLogin, providerLogin } from "../components/dbCalls";

const SignIn = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('type') === "user") {
            navigate("/UserDashboard");
        }
        else if (Cookies.get('type') === "provider") {
            navigate("/ProviderDashboard");
        }
    });

    async function submit(e) {
        e.preventDefault()
        //console.log("submit");
        if (tabValue === 0) {
            //sign in funciton here
            //console.log("user");
            const response = await userLogin({username,password});
            navigate("/UserDashboard");
        }
        else if (tabValue === 1) {
            //add provider sign in here
            //console.log("provider");
            const response = await providerLogin({username,password});
            navigate("/ProviderDashboard");
        }
    }

    //tabs
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                  </Box>
                )}
            </div>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    function tabProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    };
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return(
        <div>
            <NavBar />
            <Box className="boundingBox" sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box className="signinBox" sx={{
                    width: "30%",
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#000000",
                    backgroundColor: "#CCCCCC"
                }}>
                    <Box className="signinContent" sx={{
                        width: "100%",
                        height: "flex",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#CCCCCC"
                    }}>
                        <Typography variant="h3">
                            Sign In
                        </Typography>
                        <Box paddingBottom={"3vh"}>
                            <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab label="User" {...tabProps(0)}/>
                                <Tab label="Provider" {...tabProps(1)}/>
                            </Tabs>
                        </Box>
                        <form onSubmit={submit}>
                            <InputLabel>
                                Username
                            </InputLabel>
                            <TextField
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputLabel>
                                Password
                            </InputLabel>
                            <TextField
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Box paddingTop={"3vh"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default SignIn;