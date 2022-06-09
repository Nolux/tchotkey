<script>
  import Clock from "./components/Clock.svelte";
  import Offsets from "./components/Offsets.svelte";

  let displaySettings = false;
</script>

<main>
  <div
    class="holder"
    on:click={() => {
      displaySettings = !displaySettings;
    }}
  >
    <Clock bigScale={!displaySettings} />
  </div>
  {#if displaySettings}
    <Offsets />
  {/if}
</main>

<style>
  :global(body) {
    color: white;
    background-color: black;
  }
  main {
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
    user-select: none;
  }
</style>
