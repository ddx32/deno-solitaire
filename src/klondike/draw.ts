import { renderFoundations, renderStacks, renderDeck } from "../lib/render.ts";
import { State } from "./state.ts";

export default function (state: State) {
  // Print the board
  renderStacks(state.stacks);
  console.log("");
  renderFoundations(state.foundations);
  renderDeck(state.deck);
  console.log("");
}
