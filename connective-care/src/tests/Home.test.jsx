import React from "react";
import Home from "../pages/Home";
import { render, screen } from "@testing-library/react";

test('renders Home', () => {
    render(<Home />);
});

test('check for navbar', () => {
    render(<Home />);

    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
});

test('screen read example', () => {
    render(<Home />);
    
    expect(screen.getByText(/home page/)).toBeInTheDocument();
});