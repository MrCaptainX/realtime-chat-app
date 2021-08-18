import React from 'react'
import Chat from '../../components/chat/chat'


const Room = (props) => {
    return (
        <Chat socket={props.socket} />
    )
}

export default Room;