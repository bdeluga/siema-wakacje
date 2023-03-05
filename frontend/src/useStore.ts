import { create } from "zustand";

type ToastMessage = {
  type: "error" | "success" | "warning" | "info";
  text: string | null;
};

interface ToastState {
  message: ToastMessage;
  show: (toastObj: ToastMessage) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: {
    text: null,
    type: "error",
  },
  show: (toastObj) =>
    set(() => ({
      message: toastObj,
    })),
}));
