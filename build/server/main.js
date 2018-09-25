require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Methods to trigger all card state updates
 * Triggers all card visibility states
 * Triggers all state updates for each card state (open, matched)
 */
const CardUIActions = {
  matchedTrue(cards) {
    return cards.filter(item => item.matched);
  },
  isOpen(cards) {
    return cards.filter(item => item.open);
  },
  lastMatched(cards) {
    return cards.filter(item => item.open && !item.matched);
  },
  flipCard(item) {
    return {
      type: 'FLIP_CARD',
      item: _extends({}, item, {
        open: true
      })
    };
  },
  shuffleCards(cards) {
    let randomIndex = 0;
    let temporaryValue = null;
    let currentIndex = cards.length;

    // based on the Fisher-Yates shuffle -- specifically
    // https://www.frankmitchell.org/2015/01/fisher-yates/
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  },
  unmatchCards(card, otherCardsFlipped) {
    const newFlippedCard = {
      face: card.face,
      open: true,
      matched: false,
      index: card.index
    };
    return {
      type: 'NO_MATCH',
      items: [newFlippedCard, ...otherCardsFlipped]
    };
  },
  resolveCards(card, otherCardsFlipped) {
    const otherCardsMatched = otherCardsFlipped.map(flippedCard => {
      const newObject = {
        face: flippedCard.face,
        open: true,
        matched: true,
        index: flippedCard.index
      };
      return newObject;
    });
    const newMatchedCard = {
      face: card.face,
      open: true,
      matched: true,
      index: card.index
    };
    return {
      type: 'IS_MATCH',
      items: [newMatchedCard, ...otherCardsMatched]
    };
  },
  resetLastMatchedCards(cards) {
    const lastMatchedCards = cards.map(card => {
      const newObject = {
        face: card.face,
        open: false,
        matched: false,
        index: card.index
      };
      return newObject;
    });
    return {
      type: 'RESET_LAST_MATCH',
      items: [...lastMatchedCards]
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = (CardUIActions);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_localStorage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardUIActions__ = __webpack_require__(2);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




/**
 * Methods to trigger all game state updates
 * returns the correct game result based on user's action
 */
const GameActions = {
  triggerPlay(card, cards) {
    let action = {};
    const otherCardsFlipped = __WEBPACK_IMPORTED_MODULE_1__CardUIActions__["a" /* default */].isOpen(cards);
    if (!card.isOpen) {
      action = otherCardsFlipped.length > 0 && otherCardsFlipped.length < 2 ? GameActions.checkForMatches(card, otherCardsFlipped, cards) : __WEBPACK_IMPORTED_MODULE_1__CardUIActions__["a" /* default */].flipCard(card);
    }
    return action;
  },
  checkForMatches(card, otherCardsFlipped, cards) {
    const isMatch = otherCardsFlipped.filter(otherCard => otherCard.face === card.face);
    return isMatch.length > 0 ? GameActions.checkForWin(card, otherCardsFlipped, cards) : __WEBPACK_IMPORTED_MODULE_1__CardUIActions__["a" /* default */].unmatchCards(card, otherCardsFlipped);
  },
  checkForWin(card, otherCardsFlipped, cards) {
    const matches = __WEBPACK_IMPORTED_MODULE_1__CardUIActions__["a" /* default */].matchedTrue(cards);
    if (matches.length === cards.length - 2) {
      return GameActions.resetWonGame(cards);
    }
    return __WEBPACK_IMPORTED_MODULE_1__CardUIActions__["a" /* default */].resolveCards(card, otherCardsFlipped);
  },
  resetWonGame(items) {
    return {
      type: 'WON_GAME',
      items
    };
  },
  restartGame() {
    return {
      type: 'RESET'
    };
  },
  saveGame(state) {
    const { transition, game, loading } = state,
          storageState = _objectWithoutProperties(state, ['transition', 'game', 'loading']);
    __WEBPACK_IMPORTED_MODULE_0__services_localStorage__["a" /* default */].setStateToLocalStorage(storageState);
  },
  getLastGame() {
    const prevState = __WEBPACK_IMPORTED_MODULE_0__services_localStorage__["a" /* default */].getStateFromLocalStorage();
    const cardsValue = prevState[0][1];
    const movesValue = prevState[1][1];
    const gameWonValue = prevState[2][1];
    const normalizedState = {
      cards: cardsValue,
      moves: movesValue,
      gameWon: gameWonValue
    };

    __WEBPACK_IMPORTED_MODULE_0__services_localStorage__["a" /* default */].clearLocalGameStorage();
    return {
      state: normalizedState
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = (GameActions);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_store__);
/* globals window document localStorage */
/**
 * Methods to store current state of play to be retrieved at a later date
 */


const localGameStorage = {
  setStateToLocalStorage(state) {
    const stateEntries = Object.entries(state);
    __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('game', stateEntries);
  },
  getStateFromLocalStorage() {
    return __WEBPACK_IMPORTED_MODULE_0_store___default.a.get('game');
  },
  clearLocalGameStorage() {
    __WEBPACK_IMPORTED_MODULE_0_store___default.a.clearAll();
  }
};

/* harmony default export */ __webpack_exports__["a"] = (localGameStorage);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_compression__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_App__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__template__ = __webpack_require__(37);








const clientAssets = __webpack_require__(38); // eslint-disable-line import/no-dynamic-require
const port = parseInt("3000", 10);
const app = __WEBPACK_IMPORTED_MODULE_0_express___default.a();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(__WEBPACK_IMPORTED_MODULE_1_compression___default.a());

// Setup the public directory so that we can server static assets.
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_2_path___default.a.join(process.cwd(), "src/public")));

app.get('*', (request, response) => {
  response.send(__WEBPACK_IMPORTED_MODULE_6__template__["a" /* default */]({
    html: __WEBPACK_IMPORTED_MODULE_4_react_dom_server__["renderToString"](__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_App__["a" /* default */], null)),
    manifestJSBundle: clientAssets['manifest.js'],
    mainJSBundle: clientAssets['main.js'],
    vendorJSBundle: clientAssets['vendor.js'],
    mainCSSBundle: clientAssets['main.css']
  }));
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`); // eslint-disable-line no-console
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StateWrapper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Game_Game__ = __webpack_require__(18);







/**
 * App component, renders the App DOM Element to pass props to Game Component.
 * @param {Object} props the values for the App Element.
 * @param {String} props.game the current state of the game.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 * @param {Boolean} props.loading flag that indicates whether the game is loading.
 * @param {Array} props.moves the number of tries the user has attempted.
 * @param {Boolean} props.gameWon flag that indicates if the user has won the game.
 * @return {Array}
 */
const App = props => {
  const { game, cards, transition, loading, moves, gameWon } = props;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Game_Game__["a" /* default */], {
      game: game,
      cards: cards,
      transition: transition,
      loading: loading,
      moves: moves,
      gameWon: gameWon
    })
  );
};

App.propTypes = {
  game: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  cards: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    open: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    matched: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  })),
  transition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  loading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  moves: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  gameWon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

const WrappedApp = __WEBPACK_IMPORTED_MODULE_2__StateWrapper__["a" /* default */](App);

/* harmony default export */ __webpack_exports__["a"] = (WrappedApp);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_dataLogic_cards__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_immutable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fetchCardsService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state_gameMachine__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_CardUIActions__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









/**
 * stateSubcription HOC component, controls state changes via a reducer and a dispatcher (transition) for the entire game.
 * @param {Function} WrappedComponent the React Component passed to the HOC.
 * @return {Function}
 */
function stateSubscription(WrappedComponent) {
  return class extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {
    constructor(props) {
      super(props);

      this.initialState = {
        game: 'start',
        cards: [],
        moves: 0,
        loading: true,
        gameWon: false
      };

      this.state = this.initialState;
      this.transition = this.transition.bind(this);
      this.resetLastMatchedCards = this.resetLastMatchedCards.bind(this);
      this.reducer = this.reducer.bind(this);
      this.fetchCards = __WEBPACK_IMPORTED_MODULE_3__services_fetchCardsService__["a" /* default */].bind(this);
    }

    reducer(nextState, action) {
      const prevState = this.state;
      let updatedState = {};
      switch (nextState) {
        case 'start':
          updatedState = this.initialState;
          break;
        case 'loading':
          __WEBPACK_IMPORTED_MODULE_3__services_fetchCardsService__["a" /* default */]().then(data => {
            const cardsByLevel = __WEBPACK_IMPORTED_MODULE_1__utilities_dataLogic_cards__["a" /* filterCardsByLevel */](data, action.level);
            const normalizedCardData = __WEBPACK_IMPORTED_MODULE_1__utilities_dataLogic_cards__["b" /* normalizeCardData */](cardsByLevel);
            this.transition({
              type: 'SUCCESS',
              cards: normalizedCardData
            });
          });
          break;
        case 'playing':
          if (action.type === 'PREV_GAME') {
            const { cards, moves, gameWon } = action.state.state;
            updatedState = _extends({}, prevState, {
              cards,
              moves,
              gameWon,
              loading: false
            });
          } else if (action.type === 'SUCCESS') {
            updatedState = _extends({}, prevState, {
              cards: action.cards,
              moves: action.moves || prevState.moves,
              loading: false,
              gameWon: action.gameWon || prevState.gameWon
            });
          } else if (action.type === 'FLIP_CARD') {
            updatedState = _extends({}, prevState, {
              cards: __WEBPACK_IMPORTED_MODULE_2__utilities_immutable__["b" /* updateItemOpenState */](prevState.cards, action),
              moves: prevState.moves + 1
            });
            break;
          } else if (action.type === 'IS_MATCH') {
            updatedState = _extends({}, prevState, {
              cards: __WEBPACK_IMPORTED_MODULE_2__utilities_immutable__["a" /* mergeItems */](prevState.cards, action.items)
            });
          } else if (action.type === 'NO_MATCH') {
            updatedState = _extends({}, prevState, {
              cards: __WEBPACK_IMPORTED_MODULE_2__utilities_immutable__["a" /* mergeItems */](prevState.cards, action.items),
              moves: prevState.moves + 1
            });
          } else if (action.type === 'RESET_LAST_MATCH') {
            updatedState = _extends({}, prevState, {
              cards: __WEBPACK_IMPORTED_MODULE_2__utilities_immutable__["a" /* mergeItems */](prevState.cards, action.items)
            });
          } else if (action.type === 'WON_GAME') {
            updatedState = _extends({}, prevState, {
              cards: __WEBPACK_IMPORTED_MODULE_2__utilities_immutable__["a" /* mergeItems */](prevState.cards, action.items),
              gameWon: true
            });
          }
          break;
        default:
          break;
      }
      return updatedState;
    }

    resetLastMatchedCards(action) {
      setTimeout(() => {
        if (action.type === 'NO_MATCH') {
          const lastMatched = __WEBPACK_IMPORTED_MODULE_5__actions_CardUIActions__["a" /* default */].lastMatched(this.state.cards);
          const nextAction = __WEBPACK_IMPORTED_MODULE_5__actions_CardUIActions__["a" /* default */].resetLastMatchedCards(lastMatched);
          this.transition({
            type: nextAction.type,
            items: nextAction.items
          });
        }
      }, 800);
    }

    transition(action) {
      const currentGameState = this.state.game;
      const nextGameState = __WEBPACK_IMPORTED_MODULE_4__state_gameMachine__["a" /* default */][currentGameState][action.type];
      if (nextGameState) {
        const nextState = this.reducer(nextGameState, action);
        this.setState(() => _extends({}, nextState, {
          game: nextGameState
        }), () => this.resetLastMatchedCards(action));
      }
    }

    render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, _extends({}, this.state, { transition: this.transition }));
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (stateSubscription);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_actions_CardUIActions__ = __webpack_require__(2);


const filterCardsByLevel = (data, level) => {
  const filteredCards = data.levels.filter(item => item.difficulty === level).map(item => item.cards);

  return filteredCards.reduce((curr, cards) => curr.concat(cards), []);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = filterCardsByLevel;


const normalizeCardData = cards => {
  const shuffledCards = __WEBPACK_IMPORTED_MODULE_0__components_actions_CardUIActions__["a" /* default */].shuffleCards(cards);
  const normalizedCards = shuffledCards.map((value, index) => {
    const cardObject = {
      face: value,
      open: false,
      matched: false,
      index
    };
    return cardObject;
  });
  return normalizedCards;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = normalizeCardData;


const normalizedOtherData = () => {};
/* unused harmony export normalizedOtherData */


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// adopted from https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns
const updateItemOpenState = (items, action) => {
  const updatedItem = items.map((item, index) => {
    if (index !== action.item.index) {
      return _extends({}, item, {
        open: false
      });
    }
    return _extends({}, item, {
      open: action.item.open,
      matched: action.item.matched
    });
  });
  return updatedItem;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = updateItemOpenState;


const mergeItems = (items, action) => {
  let actionIndices = new Map();

  actionIndices = action.map(actionItem => actionItem.index);
  return items.map((item, index) => {
    const itemMatch = actionIndices.includes(index);
    if (itemMatch) {
      return action.find(returnedItem => returnedItem.index === index);
    }
    return item;
  });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeItems;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promise__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es6_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);



/**
 * Function to fetch all cards available
 * @return {Object}
 */
const fetchCards = () => fetch(`https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json`).then(response => response.json());

/* harmony default export */ __webpack_exports__["a"] = (fetchCards);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * State machine to control game state. Sources for the idea
 * include github.com/davidkpiano/xstate
 * and css-tricks.com/finite-state-machines-with-react/
 */
const gameMachine = {
  start: {
    LEVEL_SELECTION: 'loading',
    SUCCESS: 'loading',
    PREV_GAME: 'playing'
  },
  loading: {
    SUCCESS: 'playing',
    FAIL: 'start'
  },
  playing: {
    FLIP_CARD: 'playing',
    WON_GAME: 'playing',
    NO_MATCH: 'playing',
    IS_MATCH: 'playing',
    RESET_LAST_MATCH: 'playing',
    RESET: 'start'
  }
};

/* harmony default export */ __webpack_exports__["a"] = (gameMachine);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_GameActions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_CardUIActions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Deck_Deck__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Timer_Timer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Button_Button__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Modal_GameModal__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ConfirmBox_ConfirmBox__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__NewGameBox_NewGameBox__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Game_scss__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Game_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__Game_scss__);














/**
 * Game component, renders the Game DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {String} props.game the current state of the game.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 * @param {Boolean} props.loading flag that indicates whether the game is loading.
 * @param {Array} props.moves the number of tries the user has attempted.
 * @param {Boolean} props.gameWon flag that indicates if the user has won the game.
 */
const Game = props => {
  const { game, cards, transition, loading, moves, gameWon } = props;
  const matches = __WEBPACK_IMPORTED_MODULE_3__actions_CardUIActions__["a" /* default */].matchedTrue(cards);
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_10__Game_scss___default.a.container },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      { className: __WEBPACK_IMPORTED_MODULE_10__Game_scss___default.a.header },
      'NYT Games Code Test'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      'Timer: '
    ),
    ' ',
    moves > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Timer_Timer__["a" /* default */], null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      '0:00'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      `Moves: ${moves}`
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      `Matches: ${matches.length / 2 || 0}`
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_10__Game_scss___default.a.buttonContainer },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_6__Button_Button__["a" /* default */],
        { action: () => transition({ type: 'RESET' }) },
        'Start new game'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_6__Button_Button__["a" /* default */],
        {
          action: () => transition({ type: 'RESET', action: __WEBPACK_IMPORTED_MODULE_2__actions_GameActions__["a" /* default */].saveGame(props) }),
          disabled: moves < 1
        },
        'Save this game'
      )
    ),
    game === 'start' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_7__Modal_GameModal__["a" /* default */],
      { isOpen: game === 'start' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__NewGameBox_NewGameBox__["a" /* default */], {
        hardLevel: () => transition({ type: 'LEVEL_SELECTION', level: 'hard' }),
        easyLevel: () => transition({ type: 'LEVEL_SELECTION', level: 'easy' }),
        getLastGame: () => transition({ type: 'PREV_GAME', state: __WEBPACK_IMPORTED_MODULE_2__actions_GameActions__["a" /* default */].getLastGame() })
      })
    ),
    gameWon && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_7__Modal_GameModal__["a" /* default */],
      { isOpen: gameWon },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__ConfirmBox_ConfirmBox__["a" /* default */], { resetWonGame: () => transition({ type: 'RESET' }), moves: moves })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Deck_Deck__["a" /* default */], { cards: cards, loading: loading, transition: transition })
  );
};

Game.propTypes = {
  game: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  cards: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    open: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    matched: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  })),
  transition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  loading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  moves: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  gameWon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("store");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card_Card__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Deck_scss__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Deck_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Deck_scss__);






/**
 * Deck component, renders the Deck DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 * @param {Boolean} props.loading flag that indicates whether the game is loading.
 */
const Deck = props => {
  const { cards, transition, loading } = props;
  const renderedCards = cards.map(card => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Card_Card__["a" /* default */], { key: Math.random(), cards: cards, card: card, transition: transition }));
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_3__Deck_scss___default.a.container },
    !loading && renderedCards
  );
};

Deck.propTypes = {
  cards: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    open: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    matched: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  })),
  loading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  transition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (Deck);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_scss__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_GameActions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_CardUIActions__ = __webpack_require__(2);








/**
 * Card component, renders the Card DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Object} props.card the default values for the card item.
 * @param {String} props.card.face the card symbol.
 * @param {Boolean} props.card.open a flag indicating whether the card is showing.
 * @param {Boolean} props.card.matched flag indicating whether the card was matched with another card.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 */
const Card = props => {
  const { card, card: { face, open, matched }, cards, transition } = props;
  const flipCard = (chosenCard, allCards) => {
    const action = __WEBPACK_IMPORTED_MODULE_4__actions_GameActions__["a" /* default */].triggerPlay(chosenCard, allCards);
    if (action.type) transition({
      type: action.type,
      item: action.item,
      items: action.items
    });
  };

  const cardsOpen = __WEBPACK_IMPORTED_MODULE_5__actions_CardUIActions__["a" /* default */].isOpen(cards);

  const classes = __WEBPACK_IMPORTED_MODULE_2_classnames___default.a({
    [`${__WEBPACK_IMPORTED_MODULE_3__Card_scss___default.a.card}`]: true,
    [`${__WEBPACK_IMPORTED_MODULE_3__Card_scss___default.a.flipped}`]: open,
    [`${__WEBPACK_IMPORTED_MODULE_3__Card_scss___default.a.unmatched} ${__WEBPACK_IMPORTED_MODULE_3__Card_scss___default.a.ummatchedAnimation}`]: cardsOpen.length > 1 && open && !matched,
    [`${__WEBPACK_IMPORTED_MODULE_3__Card_scss___default.a.matched} ${__WEBPACK_IMPORTED_MODULE_3__Card_scss___default.a.flipped}`]: matched
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      className: classes,
      role: 'button',
      tabIndex: 0,
      onClick: !card.open ? () => flipCard(card, cards) : null,
      'aria-disabled': card.open
    },
    face
  );
};

Card.propTypes = {
  card: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    open: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    matched: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
  }),
  cards: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    open: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    matched: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
  })),
  transition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (Card);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {
	"card": "Card-card--tRKnc",
	"flipped": "Card-flipped--3Db3G",
	"flipInY": "Card-flipInY--VcZTW",
	"unmatched": "Card-unmatched--1UFrd",
	"matched": "Card-matched--3oorQ",
	"ummatchedAnimation": "Card-ummatchedAnimation--1E5jY",
	"cssAnimation": "Card-cssAnimation--PAUdi"
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {
	"container": "Deck-container--3Kd2f"
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Timer_scss__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Timer_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Timer_scss__);





const formatTime = time => {
  if (time < 0) return '--:--';
  const h = Math.floor(time / 3600);
  const m = Math.floor(time % 3600 / 60);
  const mm = m < 10 ? `0${m}` : m;
  const s = time % 60;
  const ss = s < 10 ? `0${s}` : s;
  if (h > 0) return [h, mm, ss].join(':');
  return `${m}:${ss}`;
};
/* unused harmony export formatTime */


const Timer = ({ time = 0 }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  'div',
  { className: __WEBPACK_IMPORTED_MODULE_2__Timer_scss___default.a.timer },
  formatTime(time)
);

Timer.propTypes = {
  time: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

class TimerContainer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Timer, { time: this.state.secondsElapsed })
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TimerContainer);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {
	"timer": "Timer-timer--_2kNL"
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button_scss__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Button_scss__);





/**
 * Button component, renders the Button DOM Element.
 * @param {Object} props the values for the Element.
 * @param {Function} props.action function that triggers a state change.
 * @param {Boolean} props.disabled a flag that indicates if the button can be clicked.
 */
const Button = props => {
  const { action, children, disabled } = props;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'button',
    { disabled: disabled, className: __WEBPACK_IMPORTED_MODULE_2__Button_scss___default.a.button, type: 'button', onClick: action },
    children
  );
};

Button.propTypes = {
  action: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {
	"button": "Button-button--3_Ozh"
};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Modal_scss__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Modal_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Modal_scss__);






__WEBPACK_IMPORTED_MODULE_1_react_modal___default.a.setAppElement('#root');

/**
 * GameModal component, renders the GameModal DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Boolean} isOpen a flag indicating whether the modal is open.
 * @param {Array} children a set of React child nodes.
 */
const GameModal = props => {
  const { isOpen, children } = props;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_modal___default.a,
    { className: __WEBPACK_IMPORTED_MODULE_3__Modal_scss___default.a.container, isOpen: isOpen, contentLabel: 'Game Modal' },
    children
  );
};

GameModal.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object]),
  isOpen: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (GameModal);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("react-modal");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {
	"container": "Modal-container--3vtwr"
};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ConfirmBox_scss__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ConfirmBox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ConfirmBox_scss__);





/**
 * Dialog Box component, renders the ConfirmBox DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Object} props.resetWonGame the action that saves the current game.
 * @param {Array} props.moves the number of tries the user has attempted.
 */
const ConfirmBox = props => {
  const { resetWonGame, moves } = props;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      { className: __WEBPACK_IMPORTED_MODULE_2__ConfirmBox_scss___default.a.header },
      'Congratulations! You Won!'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_2__ConfirmBox_scss___default.a.subHeader },
      'Number of Moves to Win: ',
      moves
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'button',
      { className: __WEBPACK_IMPORTED_MODULE_2__ConfirmBox_scss___default.a.button, onClick: resetWonGame },
      'Start New Game'
    )
  );
};

ConfirmBox.propTypes = {
  resetWonGame: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  moves: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (ConfirmBox);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {
	"header": "ConfirmBox-header--3055W",
	"subHeader": "ConfirmBox-subHeader--3Ifuh",
	"button": "ConfirmBox-button--ZpfGK"
};

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_localStorage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss__);







const prevGameExists = __WEBPACK_IMPORTED_MODULE_2__services_localStorage__["a" /* default */].getStateFromLocalStorage();

/**
 * Modal Dialog component, renders the NewGameBox DOM Element.
 * @param {Object} props the values for the App Element.
 * @param {Function} props.hardLevel the action that triggers the hard level of the game.
 * @param {Function} props.easyLevel the action that triggers the easy level game.
 * @param {Function} props.getLastGame action that retrieves the last game from localStorage.
 */
const NewGameBox = props => {
  const { hardLevel, easyLevel, getLastGame } = props;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      { className: __WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default.a.header },
      'Welcome to the New York Times Memory Card Game!'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h2',
      { className: __WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default.a.subHeader },
      'The Rules: pick two cards of your choosing. If the cards have the same symbol, the player keeps the pair and plays again. If not, the cards are returned to their face-down position. Play until all the cards have been matched.'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h3',
        { className: `${__WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default.a.subHeader} ${__WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default.a.direction}` },
        'Choose the level of Difficulty:'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: __WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default.a.button, onClick: hardLevel },
        'Hard'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: __WEBPACK_IMPORTED_MODULE_3__NewGameBox_scss___default.a.button, onClick: easyLevel },
        'Easy'
      ),
      prevGameExists && prevGameExists.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: getLastGame },
        'Get Last Game'
      )
    )
  );
};

NewGameBox.propTypes = {
  hardLevel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  easyLevel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  getLastGame: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["a"] = (NewGameBox);

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = {
	"header": "NewGameBox-header--2oPrI",
	"subHeader": "NewGameBox-subHeader--3Ucd6",
	"direction": "NewGameBox-direction--zZU6s",
	"button": "NewGameBox-button--3Wsye"
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {
	"container": "Game-container--3tnXo",
	"header": "Game-header--NquO6",
	"placeholder": "Game-placeholder--2BI9f"
};

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable prefer-template, max-len */

const getDeferScript = src => src ? `<script defer src="${src}"></script>` : '';

/* harmony default export */ __webpack_exports__["a"] = (vo => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    ${vo.mainCSSBundle ? '<link rel="stylesheet" type="text/css" href="' + vo.mainCSSBundle + '">' : ''}

    <title>NYT Games Web Code Test</title>
  </head>

  <body>
    <div id="root"><div>${vo.html}</div></div>
    ${getDeferScript(vo.manifestJSBundle)}
    ${getDeferScript(vo.vendorJSBundle)}
    ${getDeferScript(vo.mainJSBundle)}
  </body>
</html>`);

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = {"main.js":"http://localhost:3001/main.js"}

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map