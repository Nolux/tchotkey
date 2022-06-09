<script>
  import dayjs from "dayjs";
  import {
    hourOffset,
    minOffset,
    secOffset,
    frameOffset,
  } from "../store/offset";

  export let interval = 100;
  export let bigScale = true;

  let timecodeString = "00:00:00:00";

  window.hotkey.receive((e) => {
    window.hotkey.send(timecodeString);
  });

  const displayWithLeadingZero = (input) => {
    return input < 10 ? `0${input}` : input;
  };

  const updateClock = () => {
    let time = dayjs();
    time = time.add($hourOffset, "h");
    time = time.add($minOffset, "m");
    time = time.add($secOffset, "s");
    time = time.add($frameOffset * 40, "ms");

    timecodeString =
      time.format("HH:mm:ss") +
      ":" +
      displayWithLeadingZero(Math.floor(time.format("SSS") / 40));
  };

  setInterval(updateClock, interval);
</script>

<h1 style={bigScale ? "font-size: 4em" : "font-size: 1em"}>
  {timecodeString}
</h1>

<style>
  @font-face {
    font-family: Roboto-Mono;
    src: url("../fonts/RobotoMono-VariableFont_wght.ttf");
  }
  h1 {
    margin: 10px auto;
    font-family: "Roboto-Mono", monospace;
  }
</style>
