import { state, isGameWon } from "./state.ts";
import { render } from "./render.ts";
import { parseAction } from "./actions.ts";

while (true) {
  if (isGameWon()) {
    state.gameStatus = "won";
  }

  render(state);

  if (state.gameStatus === "playing") {
    const input = prompt("solitaire> ");
    parseAction(input);
    continue;
  }

  break;
}
