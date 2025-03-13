import { useState } from "react";

import { PkmnCard} from "./boardStateUpdate"

export const ActivePkmn = (pkmn: PkmnCard) => {

  return (<>
    <img src={pkmn.images.large}></img>
    <h4>HP: {(pkmn.hp && pkmn.gameStatus) ? pkmn.hp + pkmn.gameStatus?.additionalHP - pkmn.gameStatus?.damage : 0}</h4>
    <h4>Energy: {(pkmn.gameStatus) ? pkmn.gameStatus.energyAttached.map(i => i.name) : "None"}</h4>
    <h4>Tools: {(pkmn.gameStatus) ? pkmn.gameStatus.toolsAttached.map(i => i.name) : "None"}</h4>
    <h4>{(pkmn.gameStatus && pkmn.gameStatus.burned) ? "🔥" : ""}</h4>
    <h4>{(pkmn.gameStatus && pkmn.gameStatus.posioned) ? "💀" : ""}</h4>
    <h4>Status: {(pkmn.gameStatus) ? pkmn.gameStatus.statusCondition : ""}</h4>
  </>)
};
