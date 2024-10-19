<script lang="ts">
    import Crown from "@tabler/icons-svelte/icons/crown";
    import { currentTeam } from "../states/currentTeamState";
    import type { TeamInfo, Turn } from "../types";
    import { cardsState } from "../states/cardsState";

    export let team: TeamInfo;
    let currentTeamState = {} as Turn;
    currentTeam.subscribe((value) => {
        currentTeamState = value;
    });

    $: cardState = $cardsState;
</script>

<article
    class={`flex-grow flex justify-between items-center px-4 py-2 ${team.color === "blue" ? "bg-blue-600" : "bg-red-600"}
     shadow-lg rounded-lg text-white duration-200`}
>
    <h1 class="font-bold capitalize">
        {team.color} Team
        {#if currentTeamState.color === team.color}
            <div class="text-2xl flex">
                <Crown size={30} />({currentTeamState.player}) {currentTeamState.turns ||
                    ""}
            </div>
        {/if}
    </h1>

    {team.points} / {Math.floor(cardState.length / 2)}
</article>

<style>
</style>
