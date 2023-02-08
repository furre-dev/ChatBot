import { useState } from "react";
import SentMsg from "./SentMsg";
import RecievedMsg from "./RecievedMsg";

export default function ChatBox(props) {
    const type = props.type;
    const text = props.text;


    let bool = true;
    return (
        bool ?
            <div className={`order-[-1]`}>
                <SentMsg text={text} />
            </div> :
            <div>då</div>
    )

}