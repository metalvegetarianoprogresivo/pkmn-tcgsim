import { useEffect, useState, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from "../app/hooks"
import deck from '../boardstate/exampleDeck';

export const Home = (props: { socket: WebSocket }) => {
    const uuidElement = useRef(null);
    const [uuid, setUuid] = useState("");

    const GameStart = () => {
        if (uuidElement.current && uuidElement.current.value === "") {
            const newUuid = uuidv4();
            setUuid(newUuid);
            uuidElement.current.value = newUuid;
            navigator.clipboard.writeText(newUuid);
            props.socket.send(JSON.stringify({ message: "Subscribing", meta: "join", room: newUuid }));
        } else {
            setUuid(uuidElement.current.value);
            props.socket.send(JSON.stringify({ message: "Subscribing", meta: "join", room: uuidElement.current.value }));
            navigator.clipboard.writeText(uuidElement.current.value);
        }
    };

    return (<>
        <h1>Home Screen</h1>
        <input name="room-id" id="roomid" ref={uuidElement} type="text" />
        <button onClick={GameStart}>Enter Room</button>
    </>)
};
