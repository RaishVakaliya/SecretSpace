import { create } from "zustand";

type SuccessStore = {
  successLink: boolean;
  setSuccessLink: (val: boolean) => void;
};

export const useSuccessStore = create<SuccessStore>((set) => ({
  successLink: false,
  setSuccessLink: (val) => set({ successLink: val }),
}));
