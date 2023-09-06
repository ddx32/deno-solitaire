import { Suit, redSuits, state, values } from "./state.ts";
import { Card } from "./state.ts";

function advanceDeck() {
  const topCard = state.deck.pop();
  if (!topCard) {
    return;
  }

  state.deck.unshift(topCard);
}

function isCompatibleStackSuit(suit1: Suit, suit2: Suit) {
  return redSuits.includes(suit1) !== redSuits.includes(suit2);
}

function isLegalStackMove(card: Card, stack: Card[]) {
  if (stack.length === 0) {
    return card.value === "k";
  }

  const topCard = stack[stack.length - 1];
  return (
    isCompatibleStackSuit(card.suit, topCard.suit) &&
    card.value === values[values.indexOf(topCard.value) - 1]
  );
}

function isLegalFoundationMove(card: Card, foundation: Card[]) {
  if (foundation.length === 0) {
    return card.value === "a";
  }

  const topCard = foundation[foundation.length - 1];
  return (
    card.suit === topCard.suit &&
    card.value === values[values.indexOf(topCard.value) + 1]
  );
}

function deckToStack(promptArguments: string[]) {
  if (promptArguments.length !== 2) {
    throw new Error("Invalid command");
  }

  const destinationStack = parseInt(promptArguments[1], 10);
  if (isNaN(destinationStack)) {
    throw new Error("Invalid command");
  }

  if (
    !isLegalStackMove(
      state.deck[state.deck.length - 1],
      state.stacks[destinationStack - 1]
    )
  ) {
    throw new Error("Invalid move");
  }

  state.stacks[destinationStack - 1].push(state.deck.pop()!);
}

function toFoundation(promptArguments: string[]) {
  if (promptArguments.length !== 2) {
    throw new Error("Invalid command");
  }

  const source = parseInt(promptArguments[1], 10);
  if (isNaN(source)) {
    throw new Error("Invalid command");
  }

  const sourceStack = source === 0 ? state.deck : state.stacks[source - 1];
  const sourceCard = sourceStack[sourceStack.length - 1];
  const destinationFoundation =
    state.foundations.find((foundation) =>
      foundation.some((card) => card.suit === sourceCard.suit)
    ) || state.foundations.find((foundation) => foundation.length === 0);

  if (!destinationFoundation) {
    throw new Error("Invalid move");
  }

  if (!isLegalFoundationMove(sourceCard, destinationFoundation)) {
    throw new Error("Invalid move");
  }

  destinationFoundation.push(sourceStack.pop()!);

  if (source > 0 && sourceStack.length > 0) {
    sourceStack[sourceStack.length - 1].isUncovered = true;
  }
}

function stackToStack(promptArguments: string[]) {
  if (promptArguments.length !== 3) {
    throw new Error("Invalid command");
  }

  const sourceStackIndex = parseInt(promptArguments[0], 10);
  if (isNaN(sourceStackIndex)) {
    throw new Error("Invalid command");
  }

  const cardIndex = parseInt(promptArguments[1], 10);
  if (isNaN(cardIndex)) {
    throw new Error("Invalid command");
  }

  const destinationStackIndex = parseInt(promptArguments[2], 10);
  if (isNaN(destinationStackIndex)) {
    throw new Error("Invalid command");
  }

  const cardToMove = state.stacks[sourceStackIndex - 1][cardIndex - 1];
  if (!cardToMove || !cardToMove.isUncovered) {
    throw new Error("Invalid move");
  }

  if (!isLegalStackMove(cardToMove, state.stacks[destinationStackIndex - 1])) {
    throw new Error("Invalid move");
  }

  const sourceStack = state.stacks[sourceStackIndex - 1];
  const destinationStack = state.stacks[destinationStackIndex - 1];

  const cardsToMove = sourceStack.splice(cardIndex - 1);
  destinationStack.push(...cardsToMove);

  if (sourceStack.length > 0) {
    sourceStack[sourceStack.length - 1].isUncovered = true;
  }
}

export function parseAction(input: string | null) {
  if (!input) {
    advanceDeck();
    return;
  }

  const normalized = input.trim().replace(/\s+/g, " ");
  const promptArguments = normalized.split(" ");

  try {
    if (promptArguments[0] === "a") {
      toFoundation(promptArguments);
      return;
    }

    if (promptArguments[0] === "0") {
      deckToStack(promptArguments);
      return;
    }

    // We're moving card(s) across stacks
    const sourceStack = parseInt(promptArguments[0], 10);
    if (isNaN(sourceStack)) {
      throw new Error("Invalid command");
    }
    stackToStack(promptArguments);
  } catch (error) {
    console.error(error.message);
  }
}
