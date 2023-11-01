declare type Suit = "♠" | "♥" | "♦" | "♣";

declare type Card = {
  suit: Suit;
  value: string;
  isUncovered: boolean;
};

declare type GameType = "klondike | spider";
