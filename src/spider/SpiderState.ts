import { getSuitedDeck, uncoverCardsBelow } from "../lib/deck.ts";
import { shuffleDeck } from "../lib/deck.ts";
import { GameState } from "../state.ts";

export enum SuitVariant {
  singleSuit,
  doubleSuit,
  quadrupleSuit,
}

function getDeck(suits: Suit[]) {
  let deck: Card[] = [];
  let currentSuitIndex = 0;

  // Full deck is 104 cards
  while (deck.length < 104) {
    deck = deck.concat(getSuitedDeck(suits[currentSuitIndex]));
    currentSuitIndex = (currentSuitIndex + 1) % suits.length;
  }

  return deck;
}

function getSuits(suitVariant: SuitVariant): Suit[] {
  switch (suitVariant) {
    case SuitVariant.singleSuit:
      return ["♠"];
    case SuitVariant.doubleSuit:
      return ["♠", "♥"];
    case SuitVariant.quadrupleSuit:
      return ["♠", "♥", "♦", "♣"];
    default:
      return ["♠"];
  }
}

export class SpiderState extends GameState {
  suitVariant: SuitVariant;

  constructor(suitVariant: SuitVariant) {
    super();
    this.suitVariant = suitVariant;
    this.deck = shuffleDeck(getDeck(getSuits(suitVariant)));
    this.stacks = Array.from({ length: 10 }, () => []);
    this.foundations = Array.from({ length: 8 }, () => []);

    // The first deal lays out 54 cards on the board.
    for (let i = 0; i < 54; i++) {
      const currentStackIndex = i % 10;
      const card = this.deck.pop() as Card;
      this.stacks[currentStackIndex].push(card);
    }

    this.stacks = uncoverCardsBelow(this.stacks);
  }
}
