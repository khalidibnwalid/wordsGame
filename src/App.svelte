<script lang="ts">
  import Footer from "./lib/layout/Footer.svelte";
  import WinnerModal from "./lib/layout/modals/WinnerModal.svelte";
  import WordCard from "./lib/layout/WordCard.svelte";
  import { cardsState } from "./states/cardsState";
  import { currentTeam } from "./states/currentTeamState";
  import { teamsState } from "./states/teamsState";

  cardsState.shuffleUp();

  let isSpectator = $currentTeam?.spectator === true;
  let specNum = 0;

  currentTeam.subscribe((value) => {
    isSpectator = value.spectator === true;
  });

  window.onstorage = () => {
    const localStorage = window.localStorage;

    specNum = parseInt(localStorage.getItem("specNum") as string) || 0;
    if (!isSpectator) return;

    cardsState.replaceCards(
      JSON.parse(localStorage.getItem("cards") as string),
    );
    teamsState.replaceTeams(
      JSON.parse(localStorage.getItem("teams") as string),
    );
  };
</script>

<main class={`grid w-full h-screen`}>
  <div id="board" class=" gap-3 bg-transparent lg:py-10 lg:px-40 p-4 z-10">
    {#each $cardsState as card, i (card.revealed + card.word)}
      <WordCard {card} index={i} />
    {/each}
  </div>
  <Footer bind:specNum />
</main>

<WinnerModal />

<style>
  #board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(4, 1fr));
  }
</style>
