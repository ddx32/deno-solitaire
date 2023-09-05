export type Suit = "s" | "h" | "d" | "c";

export type Card = {
  suit: Suit;
  value: string;
  isUncovered: boolean;
};

type GameStatus = "won" | "lost" | "playing";

export type State = {
  deck: Card[];
  foundations: Card[][];
  stacks: Card[][];
  gameStatus: GameStatus;
};

const suits: Suit[] = ["s", "h", "d", "c"];
export const redSuits: Suit[] = ["h", "d"];
export const values = [
  "a",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "t",
  "j",
  "q",
  "k",
];
const deck: Card[] = suits.flatMap((suit) =>
  values.map((value) => ({ suit, value, isUncovered: true }))
);

// Shuffle the deck
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = deck[i];
  deck[i] = deck[j];
  deck[j] = temp;
}

const foundations = suits.map(() => []);
const stacks = Array.from({ length: 7 }, (_, i) => deck.splice(0, i + 1));

// Set all cards below the top card to be covered
for (const stack of stacks) {
  for (let i = 0; i < stack.length - 1; i++) {
    stack[i].isUncovered = false;
  }
}

const gameStatus: GameStatus = "playing";

export const state: State = {
  deck,
  foundations,
  stacks,
  gameStatus,
};
