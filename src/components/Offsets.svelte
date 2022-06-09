<script>
  import {
    hourOffset,
    minOffset,
    secOffset,
    frameOffset,
  } from "../store/offset";

  hourOffset.subscribe((n) => {
    localStorage.setItem("hourOffset", n);
  });
  minOffset.subscribe((n) => {
    localStorage.setItem("minOffset", n);
  });
  secOffset.subscribe((n) => {
    localStorage.setItem("secOffset", n);
  });
  frameOffset.subscribe((n) => {
    localStorage.setItem("frameOffset", n);
  });
</script>

<div>
  <div class="inputHolder">
    <div
      class="number"
      tabindex="0"
      on:keydown={(k, e) => {
        if (k.key == "ArrowUp") {
          hourOffset.set($hourOffset + 1);
        }
        if (k.key == "ArrowDown") {
          hourOffset.set($hourOffset - 1);
        }
      }}
    >
      {$hourOffset}
    </div>
    <div
      class="number"
      tabindex="0"
      on:keydown={(k, e) => {
        if (k.key == "ArrowUp") {
          minOffset.set($minOffset + 1);
        }
        if (k.key == "ArrowDown") {
          minOffset.set($minOffset - 1);
        }
      }}
    >
      {$minOffset}
    </div>
    <div
      class="number"
      tabindex="0"
      on:keydown={(k, e) => {
        if (k.key == "ArrowUp") {
          secOffset.set($secOffset + 1);
        }
        if (k.key == "ArrowDown") {
          secOffset.set($secOffset - 1);
        }
      }}
    >
      {$secOffset}
    </div>
    <div
      class="number"
      tabindex="0"
      on:keydown={(k, e) => {
        if (k.key == "ArrowUp") {
          frameOffset.set($frameOffset + 1);
        }
        if (k.key == "ArrowDown") {
          frameOffset.set($frameOffset - 1);
        }
      }}
    >
      {$frameOffset}
    </div>
  </div>
  <div class="inputHolder">
    <div>HOUR</div>
    <div>MIN</div>
    <div>SEC</div>
    <div>FRAME</div>
  </div>
</div>

<style>
  .inputHolder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 6em;
    padding-right: 6em;
  }
  .number {
    font-size: 2em;
    font-family: "Roboto Mono", monospace;
    font-weight: bold;
    color: white;
    background-color: black;
    border: none;
    outline: none;
    width: 2em;
    text-align: center;
    cursor: pointer;
  }
</style>
