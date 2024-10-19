import { writable } from "svelte/store";
import type { Turn } from "../types";

function currentTeamState() {
    const { subscribe, set, update } = writable({ color: "blue", player: "teller" } as Turn);;

    return {
        subscribe,
        switchTeam: () => update((team) => ({
            color: team.color === "blue" ? "red" : "blue",
            player: "teller",
            turns: undefined,
        })),
        switchPlayer: (turns: number) => update(({ color, ...turn }) => ({
            player: turn.player === "teller" ? "guesser" : "teller",
            color,
            turns,
        })),
        consumeTurn: () => update((team) => ({ ...team, turns: (team?.turns || 1) - 1 })),
    };
}

export const currentTeam = currentTeamState();