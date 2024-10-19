<script lang="ts">
  import Edit from "@tabler/icons-svelte/icons/edit";
  import Settings from "@tabler/icons-svelte/icons/settings";
  import IEEELogo from "./assets/ieee-cs-hu-1.png";
  import EditCardsModal from "./lib/EditCardsModal.svelte";
  import GameSettingsModal from "./lib/GameSettingsModal.svelte";
  import TeamBoard from "./lib/TeamBoard.svelte";
  import WordCard from "./lib/WordCard.svelte";
  import { cardsState } from "./states/cardsState";
  import { currentTeam } from "./states/currentTeamState";
  import { teamsState } from "./states/teamsState";

  cardsState.shuffleUp();

  let hintValue = "";
  let turns = 1;

  $: teamsData = $teamsState;

  let isTeller = $currentTeam.player === "teller";
  currentTeam.subscribe((value) => {
    isTeller = value.player === "teller";
  });

  let hintslog = [] as { word: string; color: string }[];
  function addHint() {
    hintslog = [...hintslog, { word: hintValue, color: $currentTeam.color }];
    hintValue = "";
    currentTeam.switchPlayer(turns);
    turns = 1;
  }

  let showEditCardsModal = false;
  let showGameSettingsModal = false;
</script>

<main class={`grid w-full h-screen`}>
  <div id="board" class=" gap-3 bg-transparent lg:py-10 lg:px-40 p-4 z-10">
    {#each $cardsState as card, i}
      <WordCard {card} index={i} />
    {/each}
  </div>

  <footer
    class="grid lg:grid-cols-4 grid-cols-2 w-full py-5 lg:px-32 px-4 gap-x-4"
  >
    <section class="flex-growc space-y-4">
      {#each Object.values(teamsData) as team}
        <TeamBoard {team} cards={$cardsState} />
      {/each}
    </section>

    <section class=" flex-none space-y-4">
      {#if isTeller}
        <div class="flex gap-x-1">
          <input type="text" placeholder="type a hint" bind:value={hintValue} />
          <input
            class="bg-slate-300 rounded-md flex-grow w-16 p-1 text-center hover:bg-stone-300 duration-200"
            type="number"
            min="1"
            max="10"
            bind:value={turns}
          />
          <button
            class="action-btn text-3xl px-2"
            on:click={addHint}
            disabled={!isTeller}
          >
            +
          </button>
        </div>
      {:else}
        <button
          on:click={() => currentTeam.switchTeam()}
          class="action-btn text-3xl w-full px-2"
        >
          Skip
        </button>
      {/if}

      <ul
        class="text-white space-y-1 h-32 bg-black bg-opacity-25 rounded-md p-1 overflow-y-auto"
      >
        {#each hintslog as { color, word }}
          <li>{word} by team {color}</li>
        {/each}
      </ul>
    </section>
    <section class="h-full flex flex-col gap-y-2">
      <button
        class="action-btn p-2 flex gap-x-2"
        on:click={() => (showEditCardsModal = true)}
      >
        <Edit stroke={1.5} /> Edit Cards
      </button>
      <button
        class="action-btn p-2 flex gap-x-2"
        on:click={() => (showGameSettingsModal = true)}
      >
        <Settings stroke={1.5} /> Game Settings
      </button>
    </section>

    <section>
      <img
        alt="IEEE Logo"
        src={IEEELogo}
        class="w-full max-h-44 object-contain bg-white px-4 rounded-lg"
      />
    </section>
  </footer>
</main>

<EditCardsModal bind:showModal={showEditCardsModal} />
<GameSettingsModal bind:showModal={showGameSettingsModal} />

<style>
  #board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(4, 1fr));
  }

  section {
    height: 100%;
  }
</style>
