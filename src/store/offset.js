import { writable } from "svelte/store";

export const hourOffset = writable(
  parseInt(localStorage.getItem("hourOffset")) || 0
);
export const minOffset = writable(
  parseInt(localStorage.getItem("minOffset")) || 0
);
export const secOffset = writable(
  parseInt(localStorage.getItem("secOffset")) || 0
);
export const frameOffset = writable(
  parseInt(localStorage.getItem("frameOffset")) || 0
);
