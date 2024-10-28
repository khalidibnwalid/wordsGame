import type Cards from '@tabler/icons-svelte/icons/cards';
import { writable } from 'svelte/store';
import type { TeamInfo } from '../types';
import { cardsState } from './cardsState';
import { currentTeam } from './currentTeamState';

const data = {
    blue: { points: 0, color: "blue" },
    red: { points: 0, color: "red" }
} as Record<TeamInfo['color'], TeamInfo>;

export const teamsColors = ["blue", "red", "yellow", "purple"] as Cards['colors'][];

function createState() {
    const { subscribe, set, update } = writable(data);

    function setLocalStorage(teams: Record<TeamInfo['color'], TeamInfo>) {
        localStorage.setItem('teams', JSON.stringify(teams));
    }

    return {
        subscribe,
        addPoint: (team: TeamInfo['color']) => update((teams) => {
            if (teams?.[team]) teams[team].points++;
            setLocalStorage(teams)
            return { ...teams }
        }),
        addTeam: () => {
            update((teams) => {
                const usedColors = Object.keys(teams);
                const unusedColors = teamsColors.filter(color => !usedColors.includes(color)) as TeamInfo['color'][];
                if (!unusedColors.length) return teams;

                teams[unusedColors[0]] = { points: 0, color: unusedColors[0] }

                for (let color in teams)
                    teams[color as TeamInfo['color']].points = 0

                setLocalStorage(teams)
                return { ...teams }
            })
            cardsState.shuffleUp();
        },
        removeTeam: () => {
            update((teams) => {
                const usedColors = Object.keys(teams) as TeamInfo['color'][];
                if (usedColors.length === 2) return teams;

                const lastColor = usedColors[usedColors.length - 1];
                delete teams[lastColor];

                for (let color in teams)
                    teams[color as TeamInfo['color']].points = 0

                setLocalStorage(teams)
                return { ...teams }
            })
            cardsState.shuffleUp();
        },
        replaceTeams: (newTeams: Record<TeamInfo['color'], TeamInfo>) => set(newTeams),
        resetGame: () => {
            update((oldTeams) => {
                let newTeams = {} as Record<TeamInfo['color'], TeamInfo>;
                for (let color in oldTeams)
                    newTeams[color as TeamInfo['color']] = {
                        points: 0,
                        color: color as TeamInfo['color']
                    }
                setLocalStorage(newTeams)
                return newTeams;
            })
            cardsState.shuffleUp();
            currentTeam.reset();
        },
    };
}

export const teamsState = createState();