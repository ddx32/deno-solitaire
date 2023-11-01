declare type Suit = "♠" | "♥" | "♦" | "♣";

declare type Card = {
  suit: Suit;
  value: string;
  isUncovered: boolean;
};

declare type GameType = "klondike | spider";

declare type State = {
  deck: Card[];
  foundations: Card[][];
  stacks: Card[][];
};
