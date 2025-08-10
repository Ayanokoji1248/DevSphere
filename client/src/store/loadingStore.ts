import { create } from "zustand";

type loadingStorType = {
    loading: boolean,
    setLoading: (value: boolean) => void
}

export const useLoadingStore = create<loadingStorType>((set) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value })
}))