import { useState, useEffect, useRef } from "react"
import { BiSend } from "react-icons/bi"
import RecievedMsg from "./RecievedMsg";
import SentMsg from "./SentMsg";
import ChatBox from "./ChatBox";
import {RiRadioButtonLine} from "react-icons/ri"

const cavemanPic = "https://media.discordapp.net/ephemeral-attachments/1008571040097632317/1072958691466289204/grid_0.webp?width=676&height=676";

export default function Chatbot(props) {
    const [inputVal, setInputVal] = useState();
    const [resMessage, setResMessage] = useState();
    const [resArr, setResArr] = useState([]);
    const [sentArr, setSentArr] = useState([]);

    const colorPalette = {
        colors:{
            red: "#dc2626"
        }
    }

    
    const lastMsg = useRef(null);

    const executeScroll = () => lastMsg.current.scrollIntoView({behavior: "smooth"})
    
    useEffect(() => {
        if(lastMsg.current !== null) {
            executeScroll()
            console.log("ebem")
        }
        
    },[sentArr, resArr])

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
            <div className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-gray-200 w-72 h-96 rounded-3xl overflow-hidden">
                <div className="topbar w-full h-[13%] bg-red-500 flex px-3 items-center overflow-hidden space-x-3">
                    <div className="w-9 rounded-full overflow-hidden">
                    <img alt="caveman illustration" src="/botProfilePic.png" className="scale-150" />
                    </div>
                    <div className="flex items-center space-x-1">
                    <RiRadioButtonLine className="self-end -translate-y-1.5" size={"1rem"} color="green" />
                    <h1 className="text-white text-lg font-sans font-normal">Caveman</h1>
                    </div>
                </div>
                <div className="chatBox relative flex flex-col w-full px-3 m-auto h-[75%] overflow-y-auto overflow-x-hidden border-b-2 border-gray-300">
                <div className=" w-full text-center">
                       {resArr.length > 3 ? <p className="text-xs text-gray-500">Beginning of conversation</p> : ""}
                    </div>
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
                                    
                                    <div key={index}>
                                        <SentMsg text={message} />
                                        {index < resArr.length ? <RecievedMsg text={resArr[index]}/> : ""}
                                        <div  ref={index === (sentArr.length || resArr.length) - 1 ? lastMsg : undefined} />
                                    </div>
                                   
                                    
                                )
                            })
                        }
                    
                   
                </div>
                <div className="w-full h-[12%] relative bg-gray-200">
                    <input value={inputVal} type={"text"} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAdd(inputVal);
                        }
                    }} onChange={handleChange} className=" bg-transparent text-gray-700 outline-none px-3 w-[90%] h-full" placeholder="Caveman, should I hire Furkan?" />
                    <BiSend color={colorPalette.colors.red} onClick={
                        () => {
                            { inputVal ?
                                handleAdd(inputVal)
                                : ""
                            }
                        
                    }
                    } className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer text-xl text-gray-500" />

                </div>
            </div>
        </div>)
}