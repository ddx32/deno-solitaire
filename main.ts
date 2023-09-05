import { state } from "./state.ts";
import { render } from "./render.ts";
import { parseAction } from "./actions.ts";

while (true) {
  render(state);

  if (state.gameStatus === "playing") {
    const input = prompt("solitaire> ");
    parseAction(input);
    continue;
  }

  break;
}
