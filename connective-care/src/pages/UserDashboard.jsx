import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Driver } from "../components/Driver";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { updateUser, getDrivers, getDriverAides } from "../components/dbCalls";
import IMG_1146 from "../images/IMG_1146.jpg"


const UserDashboard = () => {

    const [username,setUsername] = useState(null);

    const navigate = useNavigate();

    //console.log(Cookies.get('type'));
    
    useEffect(() => {
        if (!Cookies.get('status')) {
            navigate("/SignIn");
        }
        else if (Cookies.get('type') === "provider") {
            navigate("/ProviderDashboard");
        }
        if (username === null) {
            setUsername(Cookies.get('name'));
        }
        else {
            pullDrivers();
        }
    }, [username]);

    const [currentLocation, setCurrentLocation] = useState({
        address: '',
        latitude: null,
        longitude: null
    });

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const { address, latitude: lat, longitude: lon } = await getAddressFromCoordinates(latitude, longitude);
                        setCurrentLocation({ address, latitude: lat, longitude: lon });
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        const getAddressFromCoordinates = async (latitude, longitude) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const data = await response.json();
                const address = `${data.display_name}`;
                return { address, latitude, longitude };
            } catch (error) {
                console.error('Error fetching address:', error);
                return { address: 'Address not found', latitude: null, longitude: null };
            }
        };

        getCurrentLocation();
    }, []);

    const [dbDrivers, setDbDrivers] = useState([]);
    const [dbDriverAides, setDbDriverAides] = useState([]);

    const pullDrivers = async () => {
        setDbDrivers(await getDrivers());
        setDbDriverAides(await getDriverAides());
    }

    //we are using separate fields for the live input and the submitted input
    //use the submitted input for api calls since incomplete inputs from live vars will cause problems
    const [addressInput, setAddressInput] = useState(null);
    const [cityInput, setCityInput] = useState(null);
    const [stateInput, setStateInput] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    async function updateAddress(e) {
        e.preventDefault()
        setUsername(Cookies.get('name'))
        setAddress(addressInput)
        setCity(cityInput)
        setState(stateInput)
        
        
        const data = {
            username:username,
            address:address,
            city:city,
            state:state
        }
        
        try{
            //const res = await updateUser(data)
            alert("User Updated")
        }
        catch(error){
            console.log(error)
        }
        

    }

    return(
        <div>
            <NavBar />
            <Box className="boundingBox" sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
            }}>
                <Box className="leftColBox" sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography 
                        variant="h2" 
                        paddingBottom={"3vh"}
                    >
                        Welcome, {Cookies.get('name')}   
                    </Typography>
                    <Typography
                        variant="h4"
                        paddingBottom={"3vh"}
                    >
                        Select a driver.
                    </Typography>
                    {currentLocation.address ? (
                        <p>{currentLocation.address}</p>
                    ) : (
                        <p>Fetching user's current address...</p>
                    )}
                    <img src={IMG_1146} width="400px" height="400px" alt="" />
                    {/*<Box className="addressBox" sx={{
                        width: "50%",
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#CCCCCC"
                    }}>
                        <Box className="addressContent" sx={{
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
                                Update Address
                            </Typography>
                            <form onSubmit={updateAddress}>
                                <InputLabel>
                                    Address
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setAddressInput(e.target.value)}
                                />
                                <InputLabel>
                                    City
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setCityInput(e.target.value)}
                                />
                                <InputLabel>
                                    State
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setStateInput(e.target.value)}
                                />
                                <Box paddingTop={"3vh"}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>*/}
                </Box>
                
                <Box className="driverBox" sx={{
                    width: "50%"
                }}>
                    <h1>All Drivers</h1>
                    {dbDrivers?.map(driver => (
                        <Driver
                            firstName={driver.firstName}
                            lastName={driver.lastName}
                            company={driver.provider}
                            id={driver.driverID}
                            photo={driver.profilePicture}
                            address={driver.address}
                            city={driver.city}
                            state={driver.state}
                            currentLocation={currentLocation}
                        />
                    ))}
                    <h1>All Driver Aides</h1>
                    {dbDriverAides?.map(driverAide => (
                        <Driver
                            firstName={driverAide.firstName}
                            lastName={driverAide.lastName}
                            company={driverAide.companyName}
                            id={driverAide.idNumber}
                            photo={driverAide.profilePicture}
                            address={driverAide.address}
                            city={driverAide.city}
                            state={driverAide.state}
                            aid={true}
                            currentLocation={currentLocation}
                        />
                    ))}
                </Box>
            </Box>
        </div>
        
    )
}

export default UserDashboard;