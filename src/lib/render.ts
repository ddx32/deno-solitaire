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
    const rowNumber = `${i + 1}`.padStart(2, "0");
    row += ` -${rowNumber}-`;
    console.log(row);
  }
}

export function renderDeck(deck: Card[]) {
  const topCard = deck[deck.length - 1];
  const card = topCard ? renderCard(topCard) : "  ";
  console.log(`[${card}]`);
}

function getFoundationString(foundation: Card[]) {
  let output: string;
  if (foundation.length === 0) {
    output = " ";
  } else {
    output = renderCard(foundation[foundation.length - 1]);
  }

  return `[${output}]`;
}

function getFoundationsRow(foundations: Card[][]) {
  return foundations.reduce((rowString, foundation) => {
    rowString += getFoundationString(foundation);
    return rowString;
  }, "");
}

export function renderFoundations(foundations: Card[][]) {
  console.log(getFoundationsRow(foundations));
}

export function renderSpiderDecks(foundations: Card[][], deck: Card[]) {
  const foundationsString = getFoundationsRow(foundations);
  const dealsLeft = deck.length / 10;
  console.log(`${foundationsString} - ${dealsLeft} deals left`);
}
