import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";



const UseGetMessages = () => {
    const [loading, setLoading] = useState(false) ;
    const [messages, setMessages, selectedConversation] = useConversation() ;

    useEffect(() => {},[])

}

export default UseGetMessages ;