import React from "react";
import ProviderDashboard from "../pages/ProviderDashboard";
import { render, screen } from "@testing-library/react";

test('renders ProviderDashboard', () => {
    render(<ProviderDashboard />);
});

test('check for navbar', () => {
    render(<ProviderDashboard />);

    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
});

test('screen read example', () => {
    render(<ProviderDashboard />);
    
    expect(screen.getByText(/the landing page/)).toBeInTheDocument();
});