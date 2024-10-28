<script lang="ts">
    import { cardsState } from "../../states/cardsState";
    import { currentTeam } from "../../states/currentTeamState";
    import type { Card } from "../../types";

    export let index: number;
    export let card: Card;


    let revealed = card.revealed;
    let isTeller = $currentTeam.player === "teller";
    let isSpectator = $currentTeam?.spectator === true;

    currentTeam.subscribe((value) => {
        isTeller = value.player === "teller";
        isSpectator = value.spectator === true;
    });

    function reveal() {
        if (isTeller || isSpectator) return;
        cardsState.reveal(index);
    }

    const borderColors = new Map([
        ["blue", "border-blue-600"],
        ["red", "border-red-600"],
        ["yellow", "border-yellow-600"],
        ["purple", "border-purple-600"],
        ["neutral", "border-slate-400"],
        [undefined, "border-zinc-700"],
    ]);
</script>

<button
    class={` p-0 lg:py-4 lg:p-2 hover:bg-opacity-80 hover:scale-105 shadow-lg text-sm lg:text-lg border-8 border-solid
    ${
        isSpectator || isTeller
            ? !revealed // teller style //using a const for those values doesn't work, so we are stuck with this spaghetti code
                ? borderColors.get(card.color)
                : "border-zinc-700"
            : revealed // guesser style
              ? borderColors.get(card.color)
              : "border-zinc-700"
    }`}
    on:click={reveal}
>
    {card.word}
</button>

<style>
    button {
        flex-grow: 1;
        background: #e2e8f0;
        border-radius: 0.5rem;
        transition-duration: 0.2s;
        font-weight: 600;
        text-transform: capitalize;
    }

    button:focus {
        outline: none;
    }
</style>
