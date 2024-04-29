import React from "react";
import SignIn from "../pages/SignIn";
import { render, screen } from "@testing-library/react";

test('renders SignIn', () => {
    render(<SignIn />);
});

test('check for navbar', () => {
    render(<SignIn />);

    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
});

test('screen read example', () => {
    render(<SignIn />);
    
    expect(screen.getByText(/Username/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
})