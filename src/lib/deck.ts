export const redSuits: Suit[] = ["♥", "♦"];

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[j];
    shuffledDeck[j] = temp;
  }

  return shuffledDeck;
}

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

export function getSuitedDeck(suit: Suit) {
  return values.map((value) => ({ suit, value, isUncovered: true }));
}
