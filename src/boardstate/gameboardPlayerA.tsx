import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  incrementTurn,
  addCardsToDeck,
  drawCards,
  playerHand,
  currentTurn
} from "./boardStateUpdate"
import deck from "./exampleDeck"
import { ActivePkmn } from "./activePkmn";
import { PlayerHand } from "./playerHand";

export const GameboardPlayerA = () => {
  const dispatch = useAppDispatch()
  dispatch(addCardsToDeck({player: "A", cards: deck}))
  dispatch(drawCards({ player: "A", totalDraws: 7}))
  const turnnumber = useAppSelector(currentTurn);
  const cardsinhand = useAppSelector(playerHand);

  console.log(cardsinhand);
  

  return (<>
    <h1>current turn {turnnumber}</h1>
    <PlayerHand cards={cardsinhand}/>
  </>)
};
