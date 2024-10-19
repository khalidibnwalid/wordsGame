<script lang="ts">
    import Users from "@tabler/icons-svelte/icons/users";
    import { teamsState } from "../states/teamsState";
    import Modal from "./Modal.svelte";

    export let showModal = false;
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
                on:click={teamsState.addTeam}
            >
                +
            </button>
            <button
                class="action-btn px-2 text-3xl text-black"
                on:click={teamsState.removeTeam}
            >
                -
            </button>
        </section>
    </div>
</Modal>
