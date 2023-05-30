import { create } from "zustand";
import { Point } from "./types";
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

interface LeafletProps {
  markers: Point[];
  setMarkers: (marksers: Point[]) => void;
}

export const useMarkersStore = create<LeafletProps>((set) => ({
  markers: [],
  setMarkers: (marksers: Point[]) => set(() => ({ markers: marksers })),
}));

interface QueryKey {
  queryKey: string;
  setKey: (key: string) => void;
}

export const useQueryKeyStore = create<QueryKey>((set) => ({
  queryKey: "hotels",
  setKey: (key) => set(() => ({ queryKey: key })),
}));

interface HighlightPoint {
  point?: Point;
  setPoint: (point: Point) => void;
}

export const useHighlightStore = create<HighlightPoint>((set) => ({
  setPoint: (point) => set(() => ({ point: point })),
}));
