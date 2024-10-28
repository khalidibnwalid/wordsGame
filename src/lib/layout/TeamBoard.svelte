<script lang="ts">
    import Crown from "@tabler/icons-svelte/icons/crown";
    import { currentTeam } from "../../states/currentTeamState";
    import type { Card, TeamInfo } from "../../types";

    export let team: TeamInfo;
    export let cards: Card[]

    $: currentTeamState = $currentTeam;

    const teamColors = new Map([
        ["blue", "bg-blue-600"],
        ["red", "bg-red-600"],
        ["yellow", "bg-yellow-600"],
        ["purple", "bg-purple-600"],
        ["neutral", "bg-slate-500"],
    ]);
</script>

<article
    class={`flex-grow flex justify-between items-center px-4 py-2 ${teamColors.get(team.color)}
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

    {team.points} / {cards.filter((card) => card.color === team.color).length}
    <!-- points system needs a change -->
</article>

<style>
</style>
