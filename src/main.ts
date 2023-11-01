import drawKlondike from "./klondike/draw.ts";
import drawSpider from "./spider/draw.ts";
import { parseAction } from "./klondike/actions.ts";
import { renderWinScreen } from "./lib/render.ts";
import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";
import { GameState } from "./state.ts";
import { KlondikeState } from "./klondike/KlondikeState.ts";
import { SpiderState, SuitVariant } from "./spider/SpiderState.ts";

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

export let state: GameState;

switch (gameType) {
  case GameType.klondike:
    state = new KlondikeState();
    break;
  case GameType.spider:
    state = new SpiderState(SuitVariant.singleSuit);
    break;
  default:
    state = new KlondikeState();
}

while (true) {
  if (state.isGameWon()) {
    renderWinScreen();
    break;
  }

  if (gameType === GameType.klondike) {
    drawKlondike(state);
    const input = prompt("solitaire> ");
    parseAction(input);
    continue;
  }

  if (gameType === GameType.spider) {
    drawSpider(state);
    break;
  }

  continue;
}
