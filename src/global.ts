import { atom } from "jotai";

export const locationAtom = atom<
  { latitude: number; longitude: number } | string
>("");

export const isMobileAtom = atom<Boolean>(window.innerWidth <= 640);
