import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const socketContext = createContext() ;


export const useSocketContext = () => {
	return useContext(socketContext);
};


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    const {authUser} = useAuthContext()


    useEffect(() => {
        if(authUser){
            const socket = io("http://localhost:5000", {
                query:{
                    userId: authUser._id
                }
            })
            setSocket(socket)
            socket.on("getOnlineUsers", (users) => {
                setonlineUsers(users)
            })

            return () => socket.close()
        }else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])
    return <socketContext.Provider value={{socket,onlineUsers}}>{children}</socketContext.Provider>
}