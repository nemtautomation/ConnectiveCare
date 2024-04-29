import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { NavBar } from "../components/NavBar";
import { Driver } from "../components/Driver";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { createDriver, createDriverAide, getAllDrivers, getAllDriversAides, getDrivers, getDriverAides } from "../components/dbCalls";

const ProviderDashboard = () => {

    const [companyName, setCompanyName] = useState(null);

    const navigate = useNavigate();

    //console.log(Cookies.get('type'));
    
    useEffect(() => {
        if (!Cookies.get('status')) {
            navigate("/SignIn");
        }
        else if (Cookies.get('type') === "user") {
            navigate("/UserDashboard");
        }
        setCompanyName(Cookies.get('name'));
        if (companyName != null) {
            pullDrivers();
        }
    }, [companyName]);

    const [dbDrivers, setDbDrivers] = useState([]);
    const [dbDriverAides, setDbDriverAides] = useState([]);

    const testfunc = async () => {
        //const dbDrivers = await getAllDrivers(companyName);
        setDbDrivers(await getAllDrivers(companyName));
        //const dbDrivers = await getDrivers();
        const dbDriverAides = await getDriverAides()
        console.log(dbDrivers)
    }

    const pullDrivers = async () => {
        setDbDrivers(await getAllDrivers(companyName));
        setDbDriverAides(await getAllDriversAides(companyName));
    }

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    //const [companyName, setCompanyName] = useState(null);
    const [driverID, setDriverID] = useState(null);
    const [driverPhoto, setDriverPhoto] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    async function submit(e) {
        e.preventDefault()
        //setCompanyName(Cookies.get('name'));
        console.log("name " + companyName);
        if (tabValue === 0) {
            const data = {
                firstName:firstName,
                lastName:lastName,
                driverID:driverID,
                picture:driverPhoto,
                address:address,
                city:city,
                state:state,
                providerUsername:companyName
            }
            try{
                const res = await createDriver(data)
                alert("Driver Created");
            }
            catch(error){
                console.log(error)
            }
            //grab that from provider login session once sessions are working
        }
        else if (tabValue === 1) {
            const data = {
                firstName:firstName,
                lastName:lastName,
                driverID:driverID,
                picture:driverPhoto,
                address:address,
                city:city,
                state:state,
                providerUsername:companyName
            }
            try{
                const res = await createDriverAide(data)
                alert("Driver Aide Created");
            }
            catch(error){
                console.log(error)
            }
            //grab that from provider login session once sessions are working
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
                height: "120vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box className="leftColBox" sx={{
                    width: "50%",
                    height: "110vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography
                        variant="h2"
                        paddingBottom={"8vh"}
                    >
                        Welcome, {Cookies.get('name')}
                    </Typography>
                    <Box className="driverFormBox" sx={{
                        width: "50%",
                        height: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#CCCCCC"
                    }}>
                        <Box className="driverFormContent" sx={{
                            width: "100%",
                            height: "flex",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#000000",
                            backgroundColor: "#CCCCCC"
                        }}>
                            <TabPanel value={tabValue} index={0}>
                                <Typography variant="h3">
                                    Register Driver
                                </Typography>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <Typography variant="h3">
                                    Register Driver Aid
                                </Typography>
                            </TabPanel>
                            <Box paddingBottom={"3vh"}>
                                <Tabs value={tabValue} onChange={handleTabChange}>
                                    <Tab label="Driver" {...tabProps(0)} />
                                    <Tab label="Driver Aid" {...tabProps(1)} />
                                </Tabs>
                            </Box>
                            <form onSubmit={submit}>
                                <InputLabel>
                                    First Name
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <InputLabel>
                                    Last Name
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <InputLabel>
                                    {tabValue === 0 ?
                                        "Driver ID Number"
                                        :
                                        "Driver Aid ID Number"
                                    }
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setDriverID(e.target.value)}
                                />
                                {/*are we still planning on adding photos? we need to find a database solution to storing photos if we are*/}
                                <InputLabel>
                                    {tabValue === 0 ?
                                        "Driver Photo"
                                        :
                                        "Driver Aid Photo"
                                    }
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setDriverPhoto(e.target.value)}
                                />
                                <InputLabel>
                                    Address
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <InputLabel>
                                    City
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <InputLabel>
                                    State
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setState(e.target.value)}
                                />
                                <Box paddingTop={"3vh"}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        {tabValue === 0 ?
                                            "Register Driver"
                                            :
                                            "Register Driver Aid"
                                        }
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>

                <Box className="driverBox" sx={{
                    width: "50%"
                }}>
                    <h1>Your Drivers</h1>
                    {dbDrivers?.map(driver => (
                        <Driver
                            firstName={driver.firstName}
                            lastName={driver.lastName}
                            company={driver.provider}
                            id={driver.driverID}
                            photo={driver.picture}
                            address={driver.address}
                            city={driver.city}
                            state={driver.state}
                        />
                    ))}
                    <h1>Your Driver Aides</h1>
                    {dbDriverAides?.map(driverAide => (
                        <Driver
                            firstName={driverAide.firstName}
                            lastName={driverAide.lastName}
                            company={driverAide.provider}
                            id={driverAide.idNumber}
                            photo={driverAide.profilePicture}
                            address={driverAide.address}
                            city={driverAide.city}
                            state={driverAide.state}
                            aid={true}
                        />
                    ))}
                </Box>
            </Box>
        </div>
        
    )
}

export default ProviderDashboard;