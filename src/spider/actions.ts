import { state } from "../main.ts";
import { getPromptArguments } from "../lib/input.ts";
import { values } from "../lib/deck.ts";

function dealNewRow() {
  for (const stack of state.stacks) {
    const newCard = state.deck.pop();

    if (newCard !== undefined) {
      stack.push(newCard);
    }
  }
}

function uncoverTopCard(stack: Card[]) {
  if (!stack[stack.length - 1].isUncovered) {
    stack[stack.length - 1].isUncovered = true;
  }
}

function isLegalMove(
  sourceStack: Card[],
  destinationStack: Card[],
  sourceIndex: number
) {
  if (sourceIndex >= sourceStack.length) {
    throw new Error("Invalid move");
  }

  const isSourceCardUncovered = sourceStack[sourceIndex].isUncovered;
  const movingStack = sourceStack.filter(
    (_card, index) => index >= sourceIndex
  );
  const isStackDescending = movingStack.every((card, index) => {
    if (index === 0) {
      return true;
    }

    const previousCard = movingStack[index - 1];
    return previousCard.value === values[values.indexOf(card.value) + 1];
  });

  const isStackSameSuit = movingStack.every((card, index) => {
    if (index === 0) {
      return true;
    }

    const previousCard = movingStack[index - 1];
    return previousCard.suit === card.suit;
  });

  const isDestinationStackEmpty = destinationStack.length === 0;
  const destinationCard = destinationStack.at(-1);
  const isDestinationCardCompatible =
    destinationCard &&
    destinationCard.value === values[values.indexOf(movingStack[0].value) + 1];
  const isDestinationCompatible =
    isDestinationStackEmpty || isDestinationCardCompatible;

  return (
    isSourceCardUncovered &&
    isStackDescending &&
    isStackSameSuit &&
    isDestinationCompatible
  );
}

function moveStack(
  sourceStack: Card[],
  destinationStack: Card[],
  sourceIndex: number
) {
  const spliceIndex = sourceIndex;
  const sourceCard = sourceStack[spliceIndex];
  if (!sourceCard) {
    throw new Error("Invalid move");
  }

  const amountToSplice = sourceStack.length - spliceIndex;
  const movingStack = sourceStack.splice(spliceIndex, amountToSplice);
  destinationStack.push(...movingStack);
  uncoverTopCard(sourceStack);
}

export function parseAction(input: string | null) {
  if (!input) {
    return;
  }

  const promptArguments = getPromptArguments(input);

  try {
    if (promptArguments[0] === "deal" && promptArguments.length === 1) {
      dealNewRow();
      return;
    }

    if (promptArguments.length === 3) {
      const [srcStack, srcIndex, destStack] = promptArguments.map(
        (arg) => parseInt(arg, 10) - 1
      );

      if (
        !isLegalMove(state.stacks[srcStack], state.stacks[destStack], srcIndex)
      ) {
        throw new Error("Invalid move");
      }

      moveStack(state.stacks[srcStack], state.stacks[destStack], srcIndex);
    }
  } catch (error) {
    console.error(error.message);
    return;
  }
}
