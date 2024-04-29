import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export function Driver(props) {
    const { firstName, lastName, company, id, photo, address, city, state, aid, currentLocation } = props;
    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Cookies.get('type') === "provider") {
            //don't run location check
        }
        else if (currentLocation.latitude && currentLocation.longitude) {
            calculateDuration();
        }
    }, [currentLocation]);

    const calculateDuration = async () => {
        try {
            setLoading(true);
            // Convert driver's address to latitude and longitude
            const driverCoordinates = await getCoordinates(address, city, state);
            if (!driverCoordinates) {
                console.error('Error fetching driver coordinates.');
                setLoading(false);
                return;
            }
            
            const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${driverCoordinates.longitude},${driverCoordinates.latitude}?steps=false&geometries=geojson&overview=full`);
            const data = await response.json();
            const durationInSeconds = data.routes[0].duration;
            // Convert duration from seconds to minutes
            const durationInMinutes = Math.ceil(durationInSeconds / 60);
            setDuration(durationInMinutes);
        } catch (error) {
            console.error('Error fetching duration:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCoordinates = async (address, city, state) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address},${city},${state}`);
            const data = await response.json();
            if (data && data.length > 0) {
                return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
            }
            return null;
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return null;
        }
    };

    const navigate = useNavigate();

    const selectDriver = () => {
        Cookies.set('driver', id);
        navigate("/RequestForm");
    }

    return(
        <div>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                paddingBottom: "3vh"
            }}>
                <Box>
                    <img src={photo} alt={`${firstName} ${lastName}`} />
                </Box>
                <Box width={"3vh"} />
                <Box sx={{
                    textAlign: "left"
                }}>
                    <Typography>Driver {aid? "Aid " : ""} Name: {firstName} {lastName}</Typography>
                    <Typography>Company: {company}</Typography>
                    <Typography>ID: {id}</Typography>
                    <Typography>Address: {address}, {city}, {state}</Typography>
                    {Cookies.get('type') === "user" ? (
                        loading ? (
                            <Typography>Duration to reach user's location: Calculating...</Typography>
                        ) : duration !== null ? (
                            <Typography>Duration to reach user's location: {duration} minutes</Typography>
                        ) : (
                            <Typography>Unable to calculate the duration.</Typography>
                        ))
                        : <Box></Box>
                    }
                </Box>
                <Box width={"3vh"} />
                {Cookies.get('type') === "user" && !aid ?
                    <Button variant="contained" onClick={selectDriver}>Select</Button>
                    :
                    <Box></Box>
                }
            </Box>
        </div>
    )
}

Driver.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    aid: PropTypes.bool
};

Driver.defaultProps = {
    aid: false
}

export default Driver;