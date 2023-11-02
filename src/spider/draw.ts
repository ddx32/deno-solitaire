import { renderStacks, renderSpiderDecks } from "../lib/render.ts";

export default function (state: State) {
  // Print the board
  renderStacks(state.stacks);
  console.log("");
  renderSpiderDecks(state.foundations, state.deck);
  console.log("");
}
