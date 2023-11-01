import { getSuitedDeck, shuffleDeck, values } from "../lib/deck.ts";

export type State = {
  deck: Card[];
  foundations: Card[][];
  stacks: Card[][];
};

const suits: Suit[] = ["♠", "♥", "♦", "♣"];
const deck: Card[] = suits.flatMap((suit) => getSuitedDeck(suit));
const shuffledDeck = shuffleDeck(deck);

const foundations = suits.map(() => []);
const stacks = Array.from({ length: 7 }, (_, i) =>
  shuffledDeck.splice(0, i + 1)
);

// Set all cards below the top card to be covered
for (const stack of stacks) {
  for (let i = 0; i < stack.length - 1; i++) {
    stack[i].isUncovered = false;
  }
}

export const state: State = {
  deck: shuffledDeck,
  foundations,
  stacks,
};

export function isGameWon() {
  return foundations.every((foundation) => foundation.length === values.length);
}
