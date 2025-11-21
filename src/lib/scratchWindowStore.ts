import { writable, type Writable } from 'svelte/store';

// Der Store speichert den Verweis auf das geöffnete Fenster
export const scratchWindowReference: Writable<Window | null> = writable(null);