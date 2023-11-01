import { redSuits } from "./deck.ts";

export function renderWinScreen() {
  console.log("You won!");
}

export function renderCard(card: Card) {
  if (card.isUncovered === false) {
    return "--";
  }

  const cardText = card.suit + card.value;
  if (redSuits.includes(card.suit)) {
    return `\x1b[41m\x1b[30m${cardText}\x1b[0m`;
  } else {
    return `\x1b[40m\x1b[39m${cardText}\x1b[0m`;
  }
}

export function renderStacks(stacks: Card[][]) {
  const stackNumbers = stacks.reduce((rowString, _current, index) => {
    const colNumber = index + 1;
    const number = colNumber.toString().padStart(2, "0");
    rowString += `-${number}-`;
    return rowString;
  }, "");
  console.log(stackNumbers);
  const longestStack = Math.max(...stacks.map((stack) => stack.length));
  for (let i = 0; i < longestStack; i++) {
    let row = "";
    for (const stack of stacks) {
      if (!stack[i]) {
        row += "    ";
        continue;
      }

      const card = renderCard(stack[i]);
      row += `[${card}]`;
    }
    row += ` -0${i + 1}-`;
    console.log(row);
  }
}

export function renderDeck(deck: Card[]) {
  const topCard = deck[deck.length - 1];
  const card = topCard ? renderCard(topCard) : "  ";
  console.log(`[${card}]`);
}

export function renderFoundations(foundations: Card[][]) {
  const highestFoundationValues = foundations.map((foundation) => {
    if (foundation.length === 0) {
      return "  ";
    }

    const highestCard = foundation[foundation.length - 1];
    return renderCard(highestCard);
  });
  let row = "";
  for (const value of highestFoundationValues) {
    row += `[${value}]`;
  }
  console.log(row);
}
