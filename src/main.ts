import { state, isGameWon } from "./klondike/state.ts";
import drawKlondike from "./klondike/draw.ts";
import { parseAction } from "./klondike/actions.ts";
import { renderWinScreen } from "./lib/render.ts";
import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";

enum GameType {
  klondike = "klondike",
  spider = "spider",
}

const flags = parse(Deno.args, {
  boolean: [GameType.klondike, GameType.spider],
});

const gameType: GameType = Object.entries(flags).reduce(
  (finalType: GameType, flagEntry) => {
    const [flagName, flag] = flagEntry;
    if (flagName === "_") {
      return finalType;
    }

    if (flag) {
      finalType = flagName as GameType;
    }
    return finalType as GameType;
  },
  GameType.klondike
);

while (true) {
  if (isGameWon()) {
    renderWinScreen();
    break;
  }

  if (gameType === GameType.klondike) {
    drawKlondike(state);
    const input = prompt("solitaire> ");
    parseAction(input);
  }

  if (gameType === GameType.spider) {
    console.log("Spider solitaire is not implemented yet");
    break;
  }

  continue;
}
