import { create } from "zustand";
import { City, Place, Point } from "./types";
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

interface DataStore {
  data: Place[];
  open: boolean;
  setData: (places: Place[]) => void;
  setOpen: (state: boolean) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  open: false,
  setData: (places) => set(() => ({ data: places })),
  setOpen: (state) => set(() => ({ open: state })),
}));

interface ListStore {
  list: Place[];
  setList: (places: Place[]) => void;
}

export const useListStore = create<ListStore>((set) => ({
  list: [],
  setList: (places) => set(() => ({ list: places })),
}));
