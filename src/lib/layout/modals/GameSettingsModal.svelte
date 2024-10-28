<script lang="ts">
    import Eye from "@tabler/icons-svelte/icons/eye";
    import Users from "@tabler/icons-svelte/icons/users";
    import { cardsState } from "../../../states/cardsState";
    import { currentTeam } from "../../../states/currentTeamState";
    import { teamsState } from "../../../states/teamsState";
    import Modal from "../../ui/Modal.svelte";

    export let showModal = false;

    function syncData() {
        const localStorage = window.localStorage;
        localStorage.setItem("specNum", "1");
        cardsState.replaceCards(
            JSON.parse(localStorage.getItem("cards") as string),
        );
        teamsState.replaceTeams(
            JSON.parse(localStorage.getItem("teams") as string),
        );
        showModal = false;
    }

    function saveData() {
        const localStorage = window.localStorage;
        localStorage.setItem("cards", JSON.stringify($cardsState));
        localStorage.setItem("teams", JSON.stringify($teamsState));
        showModal = false;
    }

    function joinAsSpectator() {
        localStorage.setItem("specNum", "1");
        currentTeam.toggleSpectator(true);
        syncData();
        showModal = false;
    }

    function addTeam() {
        teamsState.addTeam();
        cardsState.shuffleUp();
        localStorage.setItem("teams", JSON.stringify($teamsState));
    }

    function removeTeam() {
        teamsState.removeTeam();
        cardsState.shuffleUp();
        localStorage.setItem("teams", JSON.stringify($teamsState));
    }

    function removeSpectators() {
        currentTeam.toggleSpectator(false);
        localStorage.setItem("specNum", "0");
        teamsState.resetGame();
    }
</script>

<Modal bind:showModal className="bg-gray-900 text-white">
    <h2 slot="header">Game Settings</h2>

    <div class="min-w-56 grid pb-3 gap-y-1">
        <section class="flex gap-x-2 text-3xl items-center">
            <Users size={40} stroke={1.5} color="#fff" />
            Teams:
            <div class="flex-grow"></div>
            <button
                class="action-btn px-2 text-3xl text-black"
                on:click={addTeam}
            >
                +
            </button>
            <button
                class="action-btn px-2 text-3xl text-black"
                on:click={removeTeam}
            >
                -
            </button>
        </section>
        <hr class="my-3" />
        <section class="grid gap-2 text-3xl items-center">
            <div class="flex">
                <Eye size={40} stroke={1.5} color="#fff" />
                Spectator:
            </div>
            <div class="grid gap-y-2">
                <button
                    class="action-btn px-2 text-xl text-black"
                    on:click={saveData}
                >
                    Join as a Player (Save)
                </button>
                <button
                    class="action-btn px-2 text-xl text-black"
                    on:click={joinAsSpectator}
                >
                    Join as Spectator
                </button>
                <button
                    class="action-btn px-2 text-xl text-black"
                    on:click={removeSpectators}
                >
                    Remove Spectators
                </button>
                <button
                    class="action-btn px-2 text-xl text-black"
                    on:click={syncData}
                >
                    Sync Data
                </button>
            </div>
        </section>
        <hr class="my-3" />
        <section class="grid gap-2 text-3xl items-center">
            <button
                class="action-btn px-2 text-xl text-black"
                on:click={teamsState.resetGame}
            >
                Reset Game
            </button>
        </section>
    </div>
</Modal>
