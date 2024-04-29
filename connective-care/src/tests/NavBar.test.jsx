import React from "react";
import { NavBar } from "../components/NavBar";
import { render, screen } from "@testing-library/react";

test('renders Home', () => {
    render(<NavBar />);
});

test('screen read example', () => {
    render(<NavBar />);
    
    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
});