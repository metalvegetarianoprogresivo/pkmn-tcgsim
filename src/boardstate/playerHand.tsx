import { useState } from "react";

import { PkmnCard } from "./boardStateUpdate"

export const PlayerHand = (props: {cards: PkmnCard[] | undefined}) => {
    if (!props.cards) return;

    console.log(props.cards);
    

    return (<>
        {props.cards.map(pkmn => <img src={pkmn.images.small}></img>)}
    </>)
};
