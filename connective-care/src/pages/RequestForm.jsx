import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { updateUser } from "../components/dbCalls";


const RequestForm = () => {

    const [username, setUsername] = useState(null);

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
    }, [username]);

    const [destinationAddress,setDestinationAddress] = useState(null);
    const [destinationCity, setDestinationCity] = useState(null);
    const [destinationState, setDestinationState] = useState(null);
    const [medical, setMedical] = useState(null);
    const [mobility, setMobility] = useState(null);
    const [obstacle, setObstacle] = useState(null);
    const [weight, setWeight] = useState(null);
    const [communication, setCommunication] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [other, setOther] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    async function submitRequest(e) {
        e.preventDefault()
        setUsername(Cookies.get('name'))

        /*
        Essential Fields Include:
        Destination Address/City/State
        Medical Information
        Mobility Information
        Weight
        */
        if (destinationAddress === null || destinationAddress === ''){
            alert("Please enter a destination address")
            return
        }
        if (destinationCity === null || destinationCity === ''){
            alert("Please enter a destination city")
            return
        }
        if (destinationState === null || destinationState === ''){
            alert("Please enter a destination state")
            return
        }
        if (medical === null || medical === ''){
            alert("Please enter if you have any medical conditions")
            return
        }
        if (mobility === null || mobility === ''){
            alert("Please enter if you have any mobility needs")
            return
        }
        if (weight === null || weight === ''){
            alert("Please enter your weight")
            return
        }

        /*
        NULLABLE (If Applicable) Fields Include:
        Obstacles
        Communication Needs
        Caregiver Information
        Other
        */

        const data = {
            username:username,
            address:address,
            city:city,
            state:state,
            destinationAddress:destinationAddress,
            destinationCity:destinationCity,
            destinationState:destinationState,
            medical:medical,
            mobility:mobility,
            obstacle:obstacle,
            weight:weight,
            communication:communication,
            caregiver:caregiver,
            other:other
        }
        
        try{
            const res = await updateUser(data)
            alert("User Updated")
        }
        catch(error){
            console.log(error)
        }

        //Part 1: Update user information based on form input

        //Part 2: Submit request containing driver info, user address, destination address, and user info
        //This is where the actual functionality of the request would start (which is outside of our scope)
    }

    const goBack = () => {
        Cookies.remove('driver');
    
        navigate("/UserDashboard");
    }

    return(
        <div>
            <Box className="backBar" sx={{
                width: "100%",
                height: "7vh",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1976D2"
            }}>
                <Button onClick={goBack} sx={{
                    color: "#FFFFFF",
                }}>
                    Go Back
                </Button>  
            </Box>
            <Box className="boundingBox" sx={{
                width: "100%",
                height: "220vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
            }}>
                <Box className="leftColBox" sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography 
                        variant="h2" 
                    >
                        Requesting Driver With ID {Cookies.get('driver')}
                    </Typography>
                    <Typography 
                        paddingBottom={"8vh"}
                    >
                        Please enter or update this information.
                    </Typography>
                    <Box className="formBox" sx={{
                        minWidth: "70%",
                        minHeight: "80%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#CCCCCC"
                    }}>
                        <Box className="formContent" sx={{
                            width: "flex",
                            height: "flex",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#000000",
                            backgroundColor: "#CCCCCC"
                        }}>
                            <Typography variant="h3">
                                Request Details
                            </Typography>
                            <form onSubmit={submitRequest}>
                                <Box className="addressHolder" sx={{
                                    display: "flex",
                                    alignItems: "row",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}>
                                    <Box className="pickup" sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <InputLabel>
                                            Pickup Address
                                        </InputLabel>
                                        <TextField
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <InputLabel>
                                            Pickup City
                                        </InputLabel>
                                        <TextField
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <InputLabel>
                                            Pickup State
                                        </InputLabel>
                                        <TextField
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </Box>
                                    <Box width={"5vh"} />
                                    <Box className="destination" sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <InputLabel>
                                            Destination Address
                                        </InputLabel>
                                        <TextField
                                            onChange={(e) => setDestinationAddress(e.target.value)}
                                        />
                                        <InputLabel>
                                            Destination City
                                        </InputLabel>
                                        <TextField
                                            onChange={(e) => setDestinationCity(e.target.value)}
                                        />
                                        <InputLabel>
                                            Destination State
                                        </InputLabel>
                                        <TextField
                                            onChange={(e) => setDestinationState(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <InputLabel>
                                    List all relevant information about your medical condition.
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setMedical(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <InputLabel>
                                    List all relevant infromation about your mobility capabilities and limitations.
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setMobility(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <InputLabel>
                                    Are there any obstacles (such as stairs) at your pickup location that we should be aware of?
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setObstacle(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <InputLabel>
                                    What is your weight?
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                <InputLabel>
                                    Do you have any special communication needs that we should be aware of?
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setCommunication(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <InputLabel>
                                    Do you have a caregiver that will accompany you? If so, list them here.
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setCaregiver(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <InputLabel>
                                    Is there any other important information you'd like us to know?
                                </InputLabel>
                                <TextField
                                    onChange={(e) => setOther(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <Box paddingTop={"3vh"}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Request
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
        
    )
}

export default RequestForm;