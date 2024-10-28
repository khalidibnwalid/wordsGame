<script lang="ts">
    import Blender from "@tabler/icons-svelte/icons/blender";
    import DeviceFloppy from "@tabler/icons-svelte/icons/device-floppy";
    import Pencil from "@tabler/icons-svelte/icons/pencil";
    import Plus from "@tabler/icons-svelte/icons/plus";
    import { cardsState } from "../states/cardsState";
    import Modal from "./Modal.svelte";

    export let showModal = false;

    let input = "";
    function addWord() {
        if (!input) return;
        cardsState.addCard(input);
        input = "";
    }

    function removeWord(i: number) {
        cardsState.removeCard(i);
        editInitValue = $cardsState.map(({ word }) => word).join(", ");
    }

    function setWords() {
        const newCards = editInitValue.split(",").map((word) => word.trim());
        cardsState.setCards(newCards);
        showEdit = false;
    }

    let showEdit = false;
    let editInitValue = $cardsState.map(({ word }) => word).join(", ");
</script>

<Modal bind:showModal className="bg-gray-900 text-white">
    <h2 slot="header">Edit Cards</h2>

    <div class="min-w-96">
        <div class="flex pb-3 gap-x-1">
            {#if showEdit}
                <button
                    class="action-btn p-2 text-white bg-blue-600"
                    style="background: #2563eb "
                    on:click={setWords}
                >
                    <DeviceFloppy stroke={1} />
                </button>
            {:else}
                <button
                    on:click={() => (showEdit = !showEdit)}
                    class="action-btn p-2 text-black"
                >
                    <Pencil stroke={1} />
                </button>
            {/if}
            <input type="text" placeholder="Add a Word" bind:value={input} />

            <button
                on:click={addWord}
                class="action-btn text-3xl px-2 text-black"
            >
                <Plus stroke={1} />
            </button>
            <button
                on:click={cardsState.shuffleUp}
                class="action-btn p-2 text-black"
            >
                <Blender stroke={1} />
            </button>
        </div>
        {#if showEdit}
            <textarea
                class="border-0 min-h-36"
                placeholder="[word], [word], [word]..."
                bind:value={editInitValue}
            />
        {:else}
            <ul class="space-y-2 max-h-96 overflow-x-auto">
                {#each $cardsState as { word }, i}
                    <li
                        class="flex justify-between text-lg bg-slate-600 hover:bg-slate-700 duration-200 p-1 rounded-md"
                    >
                        {i + 1}.{word}
                        <button
                            on:click={() => removeWord(i)}
                            class="action-btn text-xl px-2 text-black line-clamp-1"
                        >
                            x
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</Modal>
