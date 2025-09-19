import axios, { isAxiosError } from "axios";
import { create } from "zustand";

import { persist } from "zustand/middleware";
import { BACKEND_URL } from "../utils";
import userStore from "./userStore";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>
    restoreSession: () => Promise<boolean>
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

            restoreSession: async () => {
                try {
                    const res = await axios.get(`${BACKEND_URL}/user/me`, { withCredentials: true });
                    console.log(res)
                    userStore.getState().setUser(res.data.user);
                    userStore.getInitialState().setLoading(false);
                    return true
                } catch (error) {
                    console.log(error)
                    useAuthStore.getState().logout()
                    return false;
                }
            },
            logout: () => {
                userStore.getState().setUser(null);
                set({ token: null, isAuthenticated: false })
            }
        }),
        {
            name: "auth-storage"
        }
    )
)