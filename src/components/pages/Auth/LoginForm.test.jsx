// Import necessary dependencies
import React from "react";
import { render, fireEvent, waitFor, findByText } from "@testing-library/react";
import "@testing-library/jest-dom"; // For expect().toBeInTheDocument()
import { createClient } from "@/utils/supabase/client";
import LoginWithEmail from "./LoginForm";

// Mocking createClient function
jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(() => ({
        error: true, // Simulating error for invalid credentials
      })),
    },
  })),
}));

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

// Mocking useToast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

describe("LoginWithEmail", () => {
  it("shows error message for invalid credentials", async () => {
    const errorMessage = {
      title: "Invalid Credentials",
      description: "Your email or password is invalid",
    };
    const mockSignInWithPassword = jest.fn().mockResolvedValue({
      data: null,
      error: { message: errorMessage },
    });

    const supabase = createClient();
    supabase.auth.signInWithPassword = mockSignInWithPassword;

    const { getByLabelText, getByText } = render(<LoginWithEmail />);

    // Fill in the form with invalid credentials
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "123456" },
    });

    // Submit the form
    fireEvent.click(getByText("Login"));

    // Wait for async validation and error toast
    await findByText(errorMessage.description);

    // Assert that error message is displayed
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
    expect(getByText(errorMessage.description)).toBeInTheDocument();
  });
});
