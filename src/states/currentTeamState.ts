import { writable } from "svelte/store";
import type { Turn } from "../types";
import { teamsState } from "./teamsState";

export const initData = { color: "blue", player: "teller", spectator: false } as Turn

function currentTeamState() {
    const { subscribe, set, update } = writable(initData);;

    let teams = {}
    teamsState.subscribe((value) => teams = value)

    const specNum = () =>  window.localStorage.getItem('specNum')
        ? parseInt(window.localStorage.getItem('specNum') as string)
        : 0

    return {
        subscribe,
        switchTeam: () => update((team) => {
            const usedColors = Object.keys(teams);
            const index = usedColors.indexOf(team.color) === usedColors.length - 1 ?
                0 :
                usedColors.indexOf(team.color) + 1;
            let newTeam = {
                ...team,
                color: usedColors[index],
                player: specNum() === 1 ? 'guesser' : "teller",
                turns: undefined,
            }
            return newTeam as Turn
        }),
        switchPlayer: (turns: number) => update(({ color, ...turn }) => ({
            ...turn,
            player: turn.player === "teller" ? "guesser" : "teller",
            color,
            turns,
        })),
        consumeTurn: () => update((team) => ({ ...team, turns: (team?.turns || 1) - 1 })),
        // spectator:
        toggleSpectator: (isSpectator: boolean) =>
            update((team) => ({ ...team, spectator: isSpectator })),
        ///
        reset: () => update((oldData) => ({ ...initData, spectator: oldData.spectator })),
    };
}

export const currentTeam = currentTeamState();