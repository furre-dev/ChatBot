export default function RecievedMsg(props) {

    return (
        <div className="bg-slate-400 max-w-[60%] h-max px-3 py-1 rounded-xl my-4 box-content">
            <h1 className="text-right text-white" >{props.text}</h1>
        </div >
    )
}