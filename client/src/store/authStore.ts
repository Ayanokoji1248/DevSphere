import axios, { isAxiosError } from "axios";
import { create } from "zustand";

import { persist } from "zustand/middleware";
import { BACKEND_URL } from "../utils";
import userStore from "./userStore";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            login: async (email, password) => {
                try {
                    const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password }, { withCredentials: true });
                    const user = response.data.user;
                    userStore.getState().setUser(user);
                    const token = response.data.token;
                    set({ token: token, isAuthenticated: true });
                    return true;
                } catch (error) {
                    if (isAxiosError(error)) {
                        throw new Error(error.request.data.message || "Login Failed");
                    }
                    throw error;
                }
            },
            logout: () => set({ token: null, isAuthenticated: false })
        }),
        {
            name: "auth-storage"
        }
    )
)