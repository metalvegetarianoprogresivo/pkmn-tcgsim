import { useEffect, useState } from "react"

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
  const turnnumber = useAppSelector(currentTurn);
  const cardsinhand = useAppSelector(playerHand);

  console.log(cardsinhand);

  const GameStart = () => {
    console.log("User decided to start.");
  
    dispatch(addCardsToDeck({cards: deck }))
    dispatch(drawCards({totalDraws: 7 }))
  };
  

  return (<>
    <h1>current turn {turnnumber}</h1>
    <PlayerHand cards={cardsinhand}/>
    <button onClick={GameStart}>Go First</button>
    <button onClick={() => console.log("User decided to fo second.")}>Go Second</button>
    <button onClick={() => dispatch(incrementTurn())}>Turn End</button>
  </>)
};
