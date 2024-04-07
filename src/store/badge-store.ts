import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BadgeProps = {
  id: string;
  name: string;
  email: string;
  eventTitle: string;
  checkInURL: string;
  image?: string;
};

type BadgeStore = {
  data: BadgeProps | null;
  save: (badge: BadgeProps) => void;
  remove: () => void;
  updateAvatar: (uri: string) => void;
};

export const useBadgeStore = create(
  persist<BadgeStore>(
    (set) => ({
      data: null,
      save: (badge: BadgeProps) => set(() => ({ data: badge })),
      remove: () => set(() => ({ data: null })),
      updateAvatar: (uri: string) =>
        set((state) => ({
          data: state.data ? { ...state.data, image: uri } : state.data,
        })),
    }),
    {
      name: "pass-in:badge",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
