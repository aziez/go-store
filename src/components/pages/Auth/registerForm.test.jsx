// Import necessary dependencies
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // For expect().toBeInTheDocument()
import { createClient } from "@/utils/supabase/client";
import RegisterForm from "./RegisterForm";

// Mocking createClient function
jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn(() => ({
        error: null, // Simulating success for registration
      })),
    },
  })),
}));

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mocking useToast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

describe("RegisterForm", () => {
  it("registers user successfully", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    // Fill in the form with valid data
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(getByText("Register"));

    // Wait for async registration process
    await waitFor(() =>
      expect(createClient().auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    );

    // Assert that user is redirected after successful registration
    expect(useRouter().push).toHaveBeenCalledWith("/sign-in");
  });

  it("shows error message when passwords do not match", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    // Fill in the form with valid data
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "differentpassword" }, // Passwords do not match
    });

    // Submit the form
    fireEvent.click(getByText("Register"));

    // Wait for async validation and error toast
    await waitFor(() =>
      expect(createClient().auth.signUp).not.toHaveBeenCalled()
    );

    // Assert that error message is displayed
    expect(getByText("Passwords does not match")).toBeInTheDocument();
  });
});
