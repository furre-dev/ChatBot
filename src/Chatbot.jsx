import { useState, useEffect } from "react"
import { BiSend } from "react-icons/bi"
import RecievedMsg from "./RecievedMsg";
import SentMsg from "./SentMsg";
import ChatBox from "./ChatBox";

export default function Chatbot(props) {
    const [inputVal, setInputVal] = useState();
    const [resMessage, setResMessage] = useState();
    const [resArr, setResArr] = useState([]);
    const [sentArr, setSentArr] = useState([]);



    function handleChange(e) {
        setInputVal(e.target.value)
    }

    function handleAdd(inputVal) {
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
                console.log(resMessage)
            })





        setArray(newArr)
        console.log(newArr)

    }
    let num = 0;
    return (
        <div className="container max-w-max">
            <div className="chatbot bg-gray-200 w-72 h-96 rounded-3xl overflow-hidden">
                <div className="topbar w-full h-[10%] bg-red-500 flex justify-center items-center">
                    <h1 className="text-white text-sm font-sans font-bold text-center">Caveman, my personal assistant!</h1>
                </div>
                <div className="flex flex-col-reverse w-full px-3 m-auto h-[78%] overflow-y-auto border-b-2 border-gray-300">
                    <div className="">
                        {
                            sentArr.map((item) => {
                                return (
                                    <div className={`order-[-1]`} id={num++} key={num++}>
                                        <SentMsg text={item} />
                                    </div>
                                )
                            })
                        }
                        {resArr.map(item => {
                            return (
                                <div className={`order-[-1]`} id={num++} key={num++}>
                                    <RecievedMsg text={item} />
                                </div>
                            )
                        })}

                    </div>
                    <div className=" w-full text-center">
                        <p className="text-xs text-gray-500">Beginning of conversation</p>
                    </div>
                </div>
                <div className="w-full h-[12%] relative bg-gray-200">
                    <input onKeyDown={(e) => {
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