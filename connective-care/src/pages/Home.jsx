import React from "react";
import { NavBar } from "../components/NavBar";
import { Typography, Button, Box } from "@mui/material";
import { mission, problem, solution_edit, summary } from "../components/bigText";
import IMG_1140 from '../images/IMG_1140.jpg'
import IMG_1142 from '../images/IMG_1142.jpg'
import IMG_1149 from '../images/IMG_1149.jpg'
import IMG_1151 from '../images/IMG_1151.jpg'

const Home = () => {

    return(
        <div>
            <NavBar />
            <Box className="boundingBox" sx={{
                width: "100%",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10vh",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box height={"4vh"} />
                <Box className="header">
                    <Typography variant="h1">
                        ConnectiveCare
                    </Typography>
                    <Typography variant="h4">
                        Revolutionizing Non-Emergency Medical Transportation
                    </Typography>
                    <Typography>&nbsp;</Typography>
                    <Box className="buttons" sx={{
                        display: "flex",
                        alignItems: "row",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <Button
                            variant="contained"
                            href="./SignUp"
                        >
                            <Typography color="#FFFFFF" variant="h4">New User?</Typography>
                            <Typography variant="h4">&nbsp;</Typography>
                            <Typography color="#00FF44" variant="h4">Sign Up</Typography>
                        </Button>
                        <Box width={"8vh"} />
                        <Button
                            variant="contained"
                            href="./SignIn"
                        >
                            <Typography color="#FFFFFF" variant="h4">Returning User?</Typography>
                            <Typography variant="h4">&nbsp;</Typography>
                            <Typography color="#00FF44" variant="h4">Sign In</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box className="missionBox" sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "row",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "6vh"
                }}>
                    <Box className="missionText" sx={{
                        display: "flex",
                        alignItems: "column",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Typography variant="h1">Our Mission</Typography>
                        <Typography variant="h6">{mission}</Typography>
                    </Box>
                    <img src={IMG_1140} width="400px" height="400px" alt="" />
                </Box>
                <Box className="problemBox" sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "row",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    gap: "6vh"
                }}>
                    <Box className="problemText" sx={{
                        display: "flex",
                        alignItems: "column",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Typography variant="h1">A Difficult Challenge</Typography>
                        <Typography variant="h6">{problem}</Typography>
                    </Box>
                    <img src={IMG_1142} width="400px" height="400px" alt="" />
                </Box>
                <Box className="solutionBox" sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "row",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "6vh"
                }}>
                    <Box className="solutionText" sx={{
                        display: "flex",
                        alignItems: "column",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Typography variant="h1">What We Provide</Typography>
                        <Typography variant="h6">{solution_edit}</Typography>
                    </Box>
                    <img src={IMG_1149} width="400px" height="400px" alt="" />
                </Box>
                <Box className="summaryBox" sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "row",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    gap: "6vh"
                }}>
                    <Box className="summaryText" sx={{
                        display: "flex",
                        alignItems: "column",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Typography variant="h1">Stay Connected</Typography>
                        <Typography variant="h6">{summary}</Typography>
                    </Box>
                    <img src={IMG_1151} width="400px" height="400px" alt="" />
                </Box>
                <Box height={"4vh"} />
            </Box>
        </div>
    )
}

export default Home;