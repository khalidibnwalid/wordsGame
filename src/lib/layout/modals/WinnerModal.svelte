<script lang="ts">
    import { cardsState } from "../../../states/cardsState";
    import { teamsState } from "../../../states/teamsState";
    import type { TeamInfo } from "../../../types";
    import Modal from "../../ui/Modal.svelte";

    let showModal = false;
    let winnerTeam = {} as TeamInfo;

    $: cards = $cardsState;

    teamsState.subscribe((teams) => {
        for (const key in teams) {
            let team = teams[key as TeamInfo["color"]];
            const maxPoints = cards?.filter(
                (card) => card.color === team.color,
            ).length;

            if (team.points >= maxPoints && team.points > 0) {
                winnerTeam = team;
                showModal = true;
            }
        }
    });

    function anotherGame() {
        teamsState.resetGame();
        showModal = false;
    }

    const teamBgColors = new Map([
        ["blue", "bg-blue-600"],
        ["red", "bg-red-600"],
        ["yellow", "bg-yellow-600"],
        ["purple", "bg-purple-600"],
    ]) as Map<TeamInfo["color"], string>;
</script>

<Modal bind:showModal className={`${teamBgColors.get(winnerTeam.color) || ""} text-white`}>
    <h1
        slot="header"
        class="text-3xl"
    >
        {winnerTeam.color} Won !!
    </h1>
    <div class="min-w-56 grid pb-3 gap-y-1">
        <button
            class="action-btn px-2 text-3xl text-black"
            on:click={anotherGame}
        >
            Another Game?
        </button>
    </div>
</Modal>
