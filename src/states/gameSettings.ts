import { get, writable } from 'svelte/store';
import type { Card, GameSettings } from '../types';
import { cardsState } from './cardsState';

export const originalData = [
    { word: "apple", color: "blue", revealed: false },
    { word: "banana", color: "red", revealed: false },
    { word: "cherry", color: "blue", revealed: false },
    { word: "date", color: "red", revealed: false },
    { word: "elderberry", color: "blue", revealed: false },
    { word: "fig", color: "red", revealed: false },
    { word: "grape", color: "blue", revealed: false },
    { word: "honeydew", color: "red", revealed: false },
    { word: "kiwi", color: "blue", revealed: false },
    { word: "lemon", color: "red", revealed: false },
    { word: "mango", color: "blue", revealed: false },
    { word: "nectarine", color: "red", revealed: false },
    { word: "orange", color: "blue", revealed: false },
    { word: "pear", color: "red", revealed: false },
    { word: "quince", color: "blue", revealed: false },
    { word: "raspberry", color: "red", revealed: false },
    { word: "strawberry", color: "blue", revealed: false },
    { word: "tangerine", color: "red", revealed: false },
    { word: "ugli", color: "blue", revealed: false },
    { word: "vanilla", color: "red", revealed: false },
    { word: "watermelon", color: "blue", revealed: false },
    { word: "ximenia", color: "red", revealed: false },
    { word: "yuzu", color: "blue", revealed: false },
    { word: "zucchini", color: "red", revealed: false },
] as Card[]

function createState() {
    const { subscribe, set, update } = writable({} as GameSettings);

    return {
        subscribe,
    }
}

export const gameSettings = createState();