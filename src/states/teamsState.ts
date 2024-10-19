import { writable } from 'svelte/store';
import type { TeamInfo } from '../types';

const data = {
    blue: { points: 0, color: "blue" },
    red: { points: 0, color: "red" }
}

const colors = ["blue", "red", "yellow", "purple"] as const;

function createState() {
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        addPoint: (team: string) => update((teams) => {
            if (teams?.[team as TeamInfo['color']])
                teams[team as TeamInfo['color']].points++;
            return { ...teams }
        }),
    };
}

export const teamsState = createState();