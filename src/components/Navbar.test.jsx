import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock createClient function
jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        email: "test@example.com",
      }),
      signOut: jest.fn(),
    },
  })),
}));

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
  });

  it("displays user email", async () => {
    const { getByText } = render(<Navbar />);
    await waitFor(() => {
      expect(getByText("test@example.com")).toBeInTheDocument();
    });
  });

  it("calls signOut function when Logout button is clicked", async () => {
    const { getByText } = render(<Navbar />);
    const logoutButton = getByText("Logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(createClient().auth.signOut).toHaveBeenCalled();
    });
  });
});
