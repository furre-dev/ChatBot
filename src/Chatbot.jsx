import { useState, useEffect } from "react"
import { BiSend } from "react-icons/bi"
import RecievedMsg from "./RecievedMsg";
import SentMsg from "./SentMsg";
import ChatBox from "./ChatBox";

const cavemanPic = "https://media.discordapp.net/ephemeral-attachments/1008571040097632317/1072958691466289204/grid_0.webp?width=676&height=676";

export default function Chatbot(props) {
    const [inputVal, setInputVal] = useState();
    const [resMessage, setResMessage] = useState();
    const [resArr, setResArr] = useState([]);
    const [sentArr, setSentArr] = useState([]);


    function handleChange(e) {
        setInputVal(e.target.value)
    }

    function handleAdd(inputVal) {

        
        setInputVal("")

        const newSentArr = [...sentArr];
        newSentArr.push(inputVal)
        setSentArr(newSentArr)

        fetch("http://localhost:5000/api", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ inputVal })
        })
            .then(res => res.json())
            .then(data => {
                const message = data.resp.replace(/"/g, "");
                setResMessage(message)
                const newResArr = [...resArr];
                newResArr.push(message);
                setResArr(newResArr);
                console.log(resMessage);
            })



    }
    let num = 0;
    return (
        <div className="container max-w-max">
            <div className="chatbot bg-gray-200 w-72 h-96 rounded-3xl overflow-hidden">
                <div className="topbar w-full h-[13%] bg-red-500 flex px-3 items-center overflow-hidden space-x-3">
                    <div className="w-9 rounded-full overflow-hidden">
                    <img alt="caveman illustration" src="/botProfilePic.png" className="scale-150" />
                    </div>
                    <h1 className="text-white text-lg font-sans font-normal text-center">Caveman</h1>
                </div>
                <div className="chatBox flex flex-col-reverse w-full px-3 m-auto h-[75%] overflow-y-auto overflow-x-hidden border-b-2 border-gray-300">
                    <div className="h-full">
                        {sentArr.length === 0 ?
                        <div className="h-full w-full flex flex-col text-center justify-center items-center">
                            <h2 className="font-semibold text-red-500">Ask me anything!</h2> 
                            <p className="text-xs text-gray-400">Examples:<br /> "How did Furkan develope this website?"<br/><br /> "Should I hire Furkan?""
                            ,<br /><br /> "Do you have a link to the figma design page for this website?"</p>   
                         </div>
                        : ""}
                        {
                            sentArr.map((message, index) => {
                                return (
                                    <div key={index} >
                                        <SentMsg text={message}/>
                                        {index < resArr.length ? <RecievedMsg text={resArr[index]}/> : ""}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className=" w-full text-center">
                       {resArr.length > 3 ? <p className="text-xs text-gray-500">Beginning of conversation</p> : ""}
                    </div>
                </div>
                <div className="w-full h-[12%] relative bg-gray-200">
                    <input value={inputVal} type={"text"} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAdd(inputVal);
                        }
                    }} onChange={handleChange} className=" bg-transparent text-gray-700 outline-none px-3 w-[90%] h-full" placeholder="Caveman, should I hire Furkan?" />
                    <BiSend onClick={() => {
                        handleAdd(inputVal)
                    }
                    } className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer text-xl text-gray-500" />

                </div>
            </div>
        </div>)
}