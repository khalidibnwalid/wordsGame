import { writable } from "svelte/store";
import type { Turn } from "../types";
import { teamsState } from "./teamsState";

function currentTeamState() {
    const { subscribe, set, update } = writable({ color: "blue", player: "teller" } as Turn);;

    let teams = {}
    teamsState.subscribe((value) => teams = value)

    return {
        subscribe,
        switchTeam: () => update((team) => {
            const usedColors = Object.keys(teams);
            const index = usedColors.indexOf(team.color) === usedColors.length - 1 ?
                0 :
                usedColors.indexOf(team.color) + 1;
            let newTeam = {
                color: usedColors[index],
                player: "teller",
                turns: undefined,
            }
            return newTeam as Turn
        }),
        switchPlayer: (turns: number) => update(({ color, ...turn }) => ({
            player: turn.player === "teller" ? "guesser" : "teller",
            color,
            turns,
        })),
        consumeTurn: () => update((team) => ({ ...team, turns: (team?.turns || 1) - 1 })),
    };
}

export const currentTeam = currentTeamState();