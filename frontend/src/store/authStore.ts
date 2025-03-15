import { create } from "zustand";
import { loginUser, registerUser } from "../api/auth";
import { useUserStore } from "./userStore";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<string | void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("token");

  if (token) {
    useUserStore.getState().loadUserProfile(token);
  }

  return {
    token,
    isAuthenticated: !!token,

    login: async (email, password) => {
      try {
        const data = await loginUser({ email, password });

        if (data.token) {
          localStorage.setItem("token", data.token);
          set({ token: data.token, isAuthenticated: true });

          await useUserStore.getState().loadUserProfile(data.token);

          return "Login successful";
        }
      } catch (error: any) {
        return error?.response?.data?.message || "Login failed. Try again.";
      }
    },

    logout: () => {
      localStorage.removeItem("token");
      set({ token: null, isAuthenticated: false });
      useUserStore.setState({ user: null, bookings: [] });
    },

    register: async (name, email, password, phone) => {
      try {
        const response = await registerUser({ name, email, password, phone });

        if (response.message === "User registered successfully") {
          return "Registration successful. You can now log in.";
        }
      } catch (error: any) {
        return (
          error?.response?.data?.message || "Registration failed. Try again."
        );
      }
    },
  };
});
