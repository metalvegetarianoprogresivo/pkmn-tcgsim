import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import deck from './exampleDeck';
import shuffleCards from '../utils/shuffle';

export interface CardLegalities {
    standard: string,
    expanded: string,
    unlimited: string,
}

export interface Set {
    id: string,
    name: string,
    series: string,
    printedTotal: number,
    total: number,
    legalities: CardLegalities,
    ptcgoCode?: string,
    releaseDate: string,
    updatedAt: string,
    images: {
        symbol: string,
        logo: string,
    }
}

export interface PkmnGameStatus {
    used: boolean,
    damage: number,
    posioned: boolean,
    burned: boolean,
    statusCondition?: "confused" | "sleep" | "paralized",
    additionalHP: number,
    additionalRetrear: number,
    additionalAttackCost: number,
    additionalAttackValue: number,
    knockout: boolean,
    canAttack: boolean,
    canRetreat: boolean,
    canNotUseAttacks: PkmnAttacks[],
    canUseAbilities: boolean,
    energyAttached: PkmnCard[],
    toolsAttached: PkmnCard[],
}

export interface PkmnAbilities {
    name: string,
    text: string,
    type: string, // Probably we can remove it since those are deprecated.
}

export interface PkmnAttacks {
    cost: string[],
    name: string,
    text: string,
    damage: string,
    convertedEnergyCost: number,
}

export interface PkmnCard {
    id: string,
    name: string,
    supertype: "Pokémon" | "Trainer" | "Energy",
    subtypes: string[],
    level?: string,
    hp?: number,
    types?: string[],
    evolvesFrom?: string,
    evolvesTo?: string[],
    rules?: string[],
    abilities?: PkmnAbilities[],
    attacks?: PkmnAttacks[],
    weaknesses?: Array<{type: string,value: string,}>,
    resistances?: Array<{type: string, value: string}>,
    retreatCost?: string[],
    convertedRetreatCost?: number,
    set: Set,
    number: string,
    artist?: string,
    rarity: string,
    nationalPokedexNumbers?: number[],
    legalities: CardLegalities,
    regulationMark?: string,
    images: {
        small: string,
        large: string,
    }
    gameStatus?: PkmnGameStatus,
}

export interface oncePerTurnActions {
    energyAttached: boolean,
    retreatPkmn: boolean,
    stadiumPlayed: boolean,
    supportedUsed: boolean,
}

export interface PlayerInfo {
    name: string,
    activePkmn: PkmnCard | null,
    hand: PkmnCard[],
    discardPile: PkmnCard[],
    prizeCards: PkmnCard[],
    deck: PkmnCard[],
    bench: PkmnCard[],
    oncePerTurn: oncePerTurnActions,
    playerStatus: {
        canPlayItems: boolean,
        canPlayStadiums: boolean,
        canPlaySupporter: boolean,
        canPlayEnergy: boolean,
        canPlayPkmn: boolean,
        canRetreat: boolean,
        canDrawCards: boolean,
        canPutPkmnFromPlayToHand: boolean,
        canPutPkmnFromDiscardToHand: boolean,
        canPutCardsFromDiscardToHand: boolean,
        canUseAbilities: boolean,
        canNotUseAbilitiesPkmnTypes: string[],
        canNotUseAbilitiesPkmnSubTypes: string[],
        canNotUseAttackPkmnTypes: string[],
        canNotUseAttackPkmnSubTypes: string[],
    }
}

export interface BoardState {
    turnNumber: number,
    startingPlayer: string,
    currentPlayerTurn: string,
    playerA?: PlayerInfo,
    playerB?: PlayerInfo,
    log: string,
    stadiumInPlay?: PkmnCard,
    benchSize: number,
}

const initialPkmnGameStatus: PkmnGameStatus = {
    used: false,
    damage: 0,
    posioned: false,
    burned: false,
    additionalHP: 0,
    additionalRetrear: 0,
    additionalAttackCost: 0,
    additionalAttackValue: 0,
    knockout: false,
    canAttack: false,
    canRetreat: false,
    canNotUseAttacks: [],
    canUseAbilities: false,
    energyAttached: [],
    toolsAttached: [],
};

const initialPlayerState: PlayerInfo = {
    name: "",
    activePkmn: null,
    hand: [],
    discardPile: [],
    prizeCards: [],
    deck: [],
    bench: [],
    oncePerTurn: {
        energyAttached: false,
        retreatPkmn: false,
        stadiumPlayed: false,
        supportedUsed: false
    },
    playerStatus: {
        canPlayItems: false,
        canPlayStadiums: false,
        canPlaySupporter: false,
        canPlayEnergy: false,
        canPlayPkmn: false,
        canRetreat: false,
        canDrawCards: false,
        canPutPkmnFromPlayToHand: false,
        canPutPkmnFromDiscardToHand: false,
        canPutCardsFromDiscardToHand: false,
        canUseAbilities: false,
        canNotUseAbilitiesPkmnTypes: [],
        canNotUseAbilitiesPkmnSubTypes: [],
        canNotUseAttackPkmnTypes: [],
        canNotUseAttackPkmnSubTypes: []
    }
}

const initialState: BoardState = {
    turnNumber: 0,
    startingPlayer: "",
    currentPlayerTurn: "",
    log: "Game started.",
    benchSize: 5,
    playerA: {
        ...initialPlayerState
    },
    playerB: {
        ...initialPlayerState
    }
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const BoardStateUpdate = createSlice({
    name: "boardstate",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        incrementTurn: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.turnNumber += 1;
        },
        updateActivePkmn: (state, action: PayloadAction<{player: string, pkmn: PkmnCard}>) => {
            if (action.payload.pkmn.supertype !== "Pokémon") return;

            if (state.playerA && action.payload.player === "A") {
                state.playerA.activePkmn = action.payload.pkmn;
            } else if (state.playerB && action.payload.player === "B") {
                state.playerB.activePkmn = action.payload.pkmn;
            }
        },
        drawCards: (state, action: PayloadAction<{player: string, totalDraws: number}>) => {
            const currentPlayer = (action.payload.player === "A") ? state.playerA : state.playerB;
            if (!currentPlayer) return;

            for (let i = 0; i < action.payload.totalDraws; i++) {
                currentPlayer.hand.push(currentPlayer.deck[0]);
                currentPlayer.deck.shift(); // Removes the first element and updates the state.
            }

            if (action.payload.player === "A") {
                state.playerA = currentPlayer;
            } else {
                state.playerB = currentPlayer;
            }
        },
        addCardsToDeck: (state, action: PayloadAction<{player: String, cards: PkmnCard[]}>) => {
            const currentPlayer = (action.payload.player === "A") ? state.playerA : state.playerB;

            if (!currentPlayer) return;

            currentPlayer.deck = shuffleCards(currentPlayer.deck.concat(action.payload.cards));

            if (action.payload.player === "A") {
                state.playerA = currentPlayer;
            } else {
                state.playerB = currentPlayer;
            }
        },
        updateDamage: (state, action: PayloadAction<{damage: number, ownerPlayer: string, target: PkmnCard}>) => { // Damage can be positive for damage and negative for healing.
            const currentPlayer = (action.payload.ownerPlayer === "A") ? state.playerA : state.playerB;
            if (!currentPlayer) return;

            if (currentPlayer.activePkmn && currentPlayer.activePkmn.gameStatus && currentPlayer.activePkmn === action.payload.target) {
                currentPlayer.activePkmn.gameStatus.damage += action.payload.damage;
            } else {
                for (const i in currentPlayer.bench) {
                    if (currentPlayer.bench[i].gameStatus && currentPlayer.bench[i] === action.payload.target) {
                        currentPlayer.bench[i].gameStatus.damage += action.payload.damage;
                    }
                }
            }

            if (action.payload.ownerPlayer === "A") {
                state.playerA = currentPlayer;
            } else {
                state.playerB = currentPlayer;
            }
        },
        setDamage: (state, action: PayloadAction<{damage: number, ownerPlayer: string, target: PkmnCard}>) => { 
            const currentPlayer = (action.payload.ownerPlayer === "A") ? state.playerA : state.playerB;
            if (!currentPlayer) return;

            if (currentPlayer.activePkmn && currentPlayer.activePkmn.gameStatus && currentPlayer.activePkmn === action.payload.target) {
                currentPlayer.activePkmn.gameStatus.damage = action.payload.damage;
            } else {
                for (const i in currentPlayer.bench) {
                    if (currentPlayer.bench[i].gameStatus && currentPlayer.bench[i] === action.payload.target) {
                        currentPlayer.bench[i].gameStatus.damage = action.payload.damage;
                    }
                }
            }

            if (action.payload.ownerPlayer === "A") {
                state.playerA = currentPlayer;
            } else {
                state.playerB = currentPlayer;
            }
        },
    },
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        currentTurn: boardstate => boardstate.turnNumber,
        playerHand: boardstate => boardstate.playerA?.hand,
    },
})

// Action creators are generated for each case reducer function.
export const { incrementTurn, drawCards, addCardsToDeck } =
    BoardStateUpdate.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { currentTurn, playerHand } = BoardStateUpdate.selectors

export default BoardStateUpdate.reducer;
