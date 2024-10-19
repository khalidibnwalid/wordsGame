import type Cards from '@tabler/icons-svelte/icons/cards';
import { writable } from 'svelte/store';
import type { Card, Turn } from '../types';
import { currentTeam } from './currentTeamState';
import { originalData } from './gameSettings';
import { teamsState } from './teamsState';

function createState() {
    const { subscribe, set, update } = writable(originalData);

    let currentTeamState = {} as Turn
    currentTeam.subscribe((value) => currentTeamState = value)

    let teams = {}
    teamsState.subscribe((value) => teams = value)

    function generateColors(n: number): Cards['colors'][] {
        const usedColors = [...Object.keys(teams), "neutral"];
        const portion = Math.ceil(n / usedColors.length);
        let colors = [] as Cards['colors'][];
        for (let color of usedColors)
            colors = colors.concat(Array(portion).fill(color))

        const shuffledColors = colors.sort(() => Math.random() - 0.5);
        return shuffledColors
    }

    return {
        subscribe,
        reveal: (index: number) => update((cards) => {
            if (!cards[index].revealed) {
                if (cards[index].color !== "neutral")
                    teamsState.addPoint(cards[index].color);
                cards[index].revealed = true;
            }

            if (cards[index].color !== currentTeamState.color
                || currentTeamState.turns === 0)
                currentTeam.switchTeam();
            else
                currentTeam.consumeTurn();

            return cards;
        }),
        setCards: (cards: string[]) => {
            const shuffledColors = generateColors(cards.length);
            const newCards = cards.map((word, index) => ({ word, color: shuffledColors[index], revealed: false }));
            set(newCards)
        },
        addCard: (word: Card['word']) => update((cards) => {
            const usedColors = [...Object.keys(teams), "neutral"] as Card['color'][];
            const randomIndex = Math.floor(Math.random() * usedColors.length);
            const color = usedColors[randomIndex];
            cards.push({ word, color, revealed: false });
            return cards;
        }),
        removeCard: (index: number) => update((cards) => {
            cards.splice(index, 1);
            return cards;
        }),
        /** produce perfectly distributed cards & reset the game */
        shuffleUp: () => update((cards) => {
            const shuffledColors = generateColors(cards.length);
            const shuffledCards = cards.map((card, index) => ({ ...card, color: shuffledColors[index], revealed: false }));
            return shuffledCards;
        }),
    };
}

export const cardsState = createState();