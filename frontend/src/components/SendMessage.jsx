import React, {useState} from "react"

const SendMessage= ()=>
{
const [message, setMessage]= useState('')

    return(
        <div>
            <form action="">
                <input type="text" 
                id="message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}/>

            <button> Send </button>
            </form>
        </div>
    )
}


export default sendMessage