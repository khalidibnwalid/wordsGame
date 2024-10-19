import type Cards from '@tabler/icons-svelte/icons/cards';
import { writable } from 'svelte/store';
import type { TeamInfo } from '../types';
import { cardsState } from './cardsState';

const data = {
    blue: { points: 0, color: "blue" },
    red: { points: 0, color: "red" }
} as Record<TeamInfo['color'], TeamInfo>;

export const teamsColors = ["blue", "red", "yellow", "purple"] as Cards['colors'][];

function createState() {
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        addPoint: (team: TeamInfo['color']) => update((teams) => {
            if (teams?.[team]) teams[team].points++;
            return { ...teams }
        }),
        addTeam: () => {
            update((teams) => {
                const usedColors = Object.keys(teams);
                const unusedColors = teamsColors.filter(color => !usedColors.includes(color)) as TeamInfo['color'][];
                if (!unusedColors.length) return teams;

                let newTeams = { ...teams }
                newTeams[unusedColors[0]] = { points: 0, color: unusedColors[0] }
                return newTeams
            })
            cardsState.shuffleUp();
        },
        removeTeam: () => {
            update((teams) => {
                const usedColors = Object.keys(teams) as TeamInfo['color'][];
                if (usedColors.length === 2) return teams;

                const lastColor = usedColors[usedColors.length - 1];
                delete teams[lastColor];
                return { ...teams }
            })
            cardsState.shuffleUp();
        },
    };
}

export const teamsState = createState();