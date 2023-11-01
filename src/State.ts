import { values } from "./lib/deck.ts";

export abstract class GameState {
  deck: Card[];
  foundations: Card[][];
  stacks: Card[][];

  constructor() {
    this.deck = [];
    this.foundations = [];
    this.stacks = [];
  }

  get(): State {
    return {
      deck: this.deck,
      foundations: this.foundations,
      stacks: this.stacks,
    };
  }

  isGameWon() {
    return this.foundations.every(
      (foundation) => foundation.length === values.length
    );
  }
}
