



export default function RecievedMsg(props) {
    props.time;

    return (
        <div className="bg-slate-500 mr-auto w-max max-w-[80%] h-max px-3 py-1 my-4 rounded-xl  box-content">
            <h1 className=" text-white" >{props.text}</h1>
            
        </div >
    )
}