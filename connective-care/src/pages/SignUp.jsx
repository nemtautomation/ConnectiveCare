import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { userSignup, providerSignup } from "../components/dbCalls";

const SignUp = () => {
    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    const minimumPasswordLength = 8

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('type') === "user") {
            navigate("/UserDashboard");
        }
        else if (Cookies.get('type') === "provider") {
            navigate("/ProviderDashboard");
        }
    });
    
    //handles any change when creating the info
    const handleUser = (event) => {
        setUsername(event.target.value);
      };
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };


    async function submit(e) {
        e.preventDefault()
        //sign up funciton here
        // password security rules
        // 1. at least 8 characters
        // 2. at least 1 uppercase and at least 1 lowercase letter
        // 3. at least 1 number
        // 4. at least one special character
        if (password.length < minimumPasswordLength) {
            alert("Password must be at least 8 characters")
            return
        }
        if (!passwordRegex.test(password)) {
            alert("Password must meet the criteria:\n1. Contains at least 1 uppercase letter\n2. Contains at least 1 lowercase letter\n3. Contains at least 1 number\n4. Contains at least 1 special characters")
            return
        }
        if (confirmPassword !== password){
            alert("Passwords do not match")
            return
        }
        if (tabValue === 0) {
            try{
                const response = await userSignup({username,password})
                alert("User has successfully signed up");
                navigate("/SignIn");
            }
            catch(error){
                console.log(error)
            }
        }
        else if (tabValue === 1) {
            try{
                const response = await providerSignup({username,password})
                alert("Provider has successfully signed up");
                navigate("/SignIn");
            }
            catch(error){
                console.log(error)
            }
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
                    <Typography>{children}</Typography>
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
                <Box className="signupBox" sx={{
                    width: "30%",
                    height: "60%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#000000",
                    backgroundColor: "#CCCCCC"
                }}>
                    <Box className="signupContent" sx={{
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
                            Sign Up
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
                                onChange={handleUser}
                            />
                            <InputLabel>
                                Password
                            </InputLabel>
                            <TextField
                                type="password"
                                onChange={handlePassword}
                            />
                            <InputLabel>
                                Confirm Password
                            </InputLabel>
                            <TextField
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Box paddingTop={"3vh"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default SignUp;