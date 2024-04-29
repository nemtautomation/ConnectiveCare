import React from "react";
import UserDashboard from "../pages/UserDashboard";
import { render, screen } from "@testing-library/react";

test('renders UserDashboard', () => {
    render(<UserDashboard />);
});

test('check for navbar', () => {
    render(<UserDashboard />);

    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
});

test('screen read example', () => {
    render(<UserDashboard />);
    
    expect(screen.getByText(/the landing page/)).toBeInTheDocument();
});