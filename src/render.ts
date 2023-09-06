import { Card, State, redSuits } from "./state.ts";

function renderWinScreen() {
  console.log("You won!");
}

function renderLoseScreen() {
  console.log("You lost!");
}

function renderCard(card: Card) {
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

function renderStacks(stacks: State["stacks"]) {
  console.log("-01--02--03--04--05--06--07-");
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

function renderFoundations(foundations: State["foundations"]) {
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

function renderDeck(deck: State["deck"]) {
  const topCard = deck[deck.length - 1];
  const card = topCard ? renderCard(topCard) : "  ";
  console.log(`[${card}]`);
}

export function render(state: State) {
  if (state.gameStatus === "won") {
    renderWinScreen();
    return;
  }

  // Print the board
  renderStacks(state.stacks);
  console.log("");
  renderFoundations(state.foundations);
  renderDeck(state.deck);
  console.log("");
}
