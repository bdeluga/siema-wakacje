import { create } from "zustand";

interface ToastMessage {
  type: "error" | "success" | "warning" | "info";
  text: string | null;
}

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

interface QueryKey {
  queryKey: string;
  setKey: (key: string) => void;
}

export const useQueryKeyStore = create<QueryKey>((set) => ({
  queryKey: "hotels",
  setKey: (key) => set(() => ({ queryKey: key })),
}));
