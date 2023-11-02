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
  const previousCard = stack[stack.length - 1];
  if (previousCard && !previousCard.isUncovered) {
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

function moveCompletedStacksToFoundations() {
  for (const stack of state.stacks) {
    const finishedStack = stack
      .filter((card) => card.isUncovered)
      .reduce((runningStack, card) => {
        if (runningStack.length === 0) {
          runningStack.push(card);
          return runningStack;
        }

        const previousCard = runningStack[runningStack.length - 1];
        if (
          previousCard.suit === card.suit &&
          values.indexOf(previousCard.value) === values.indexOf(card.value) + 1
        ) {
          runningStack.push(card);
        }

        return runningStack;
      }, [] as Card[]);

    if (finishedStack.length === 13) {
      const emptyFoundation = state.foundations.find(
        (foundation) => foundation.length === 0
      );
      if (emptyFoundation) {
        emptyFoundation.push(...finishedStack);
        const spliceStart = stack.indexOf(finishedStack[0]);
        stack.splice(spliceStart, finishedStack.length);
      }
    }
  }
}

export function parseAction(input: string | null) {
  if (!input) {
    return;
  }

  const promptArguments = getPromptArguments(input);

  try {
    if (promptArguments[0] === "deal" && promptArguments.length === 1) {
      dealNewRow();
    } else if (promptArguments.length === 3) {
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

    moveCompletedStacksToFoundations();
  } catch (error) {
    console.error(error.message);
    return;
  }
}
