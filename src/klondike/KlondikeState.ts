import { GameState } from "../state.ts";
import { getSuitedDeck, shuffleDeck, uncoverCardsBelow } from "../lib/deck.ts";

export class KlondikeState extends GameState {
  constructor() {
    super();
    const suits: Suit[] = ["♠", "♥", "♦", "♣"];
    const deck: Card[] = suits.flatMap((suit) => getSuitedDeck(suit));
    const shuffledDeck = shuffleDeck(deck);

    const foundations = suits.map(() => []);
    const stacks = Array.from({ length: 7 }, (_, i) =>
      shuffledDeck.splice(0, i + 1)
    );

    const uncoveredStacks = uncoverCardsBelow(stacks);

    this.deck = shuffledDeck;
    this.foundations = foundations;
    this.stacks = uncoveredStacks;
  }
}
