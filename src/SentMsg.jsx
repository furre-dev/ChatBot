export default function SentMsg(props) {
    return (
        <div className="bg-blue-500 ml-auto max-w-[60%] h-max px-3 py-1 rounded-xl my-4 box-content">
            <h1 className="text-left text-white" >{props.text}</h1>
        </div >
    )
}