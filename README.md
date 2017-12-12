# NYT Web Code Test: The New York Times Memory Game!

Thank you for visiting the New York Times Memory Game! This is a playable version
of the card-matching game Memory. 

## Memory Game Guidelines

The game follows these rules:

* All cards begin face down.
* The player turns one card face up, and then a second.
  * If they match, the pair is removed from the game.
  * If they do not match, both cards turn back over.
* The game ends when the player finds all matching pairs.

## Memory Game Features

The game includes:

* A Timer that starts when the player flips over the first card, and stops when the game ends.
* A Scoreboard that records the player's number of moves and successful matches in the current game.

The game also includes:

* Easy/Difficult levels: choose your level! Have either an eight-card or a 16-card game.
* Shuffled cards at the start of each game, so no game is ever the same (unless you play _quite a lot_).
* Saving a game for later: the ability save and resume an unfinished game.

The app fetches the game data found [here](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json).

## Setup

`git clone` the repository and run `npm install`. Once you've done that, run `npm run dev`. Once that is running, you can view
the app at `localhost:3000`. 

### Next Development Tasks

* Component testing in Enzyme
* Accessibility Testing and including enhanced A11y features, such as voice-over effects and high contrast visual options if the user is visually impaired
* Refactoring the `StateWrapper` HOC to make the reducer and transition (my dispatch helper) into modules
* Capturing the time in `localStorage` when a user saves a game
* [Nice-to-Haves] Upgrading to React 16.4+ to take advantage of the Context API (it can create problems with tracking down references to the Provider for large apps, but for a smaller app with less than five levels like this one could save time and technical debt)
* [Nice-to-Haves] Even stronger typechecking with Flow or Typescript 
