import React from "react";
import SignUp from "../pages/SignUp";
import { render, screen } from "@testing-library/react";

test('renders SignUp', () => {
    render(<SignUp />);
});

test('check for navbar', () => {
    render(<SignUp />);

    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
});

test('screen read example', () => {
    render(<SignUp />);
    
    expect(screen.getByText(/Username/)).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText(/Confirm Password/)).toBeInTheDocument();
})