const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        src="https://static-00.iconduck.com/assets.00/user-avatar-icon-2048x2048-wpp8os2d.png" 
                        alt="Tailwind CSS chat buddle component" 
                    />
                </div>
            </div>
            <div className="chat-bubble text-white bg-blue-500">Hi! What is app</div>
            <div className="chat-footer opacity-50 text-xs flex-gap-1 items-center">12:42</div>
        </div>
    )
}

export default Message ;