import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'



const Chat = (props) => {
    const router = useRouter();
    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const { channel , name } = router.query;
    const socket = props.socket;
  
  
     useEffect(() => {
      if(!channel || !name) {
        router.push('/')
      }

       socket.emit('joinRoom',{name , channel})
     },[channel,name]);


     useEffect(() => {
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("users", (users) => {
        setUsers(users);
      });

     },[]);
    
 
     const sendMessage = (event) => {
      event.preventDefault();
  
      if(message) {
        socket.emit('chat', message);
        setMessage('')
      }
    }

    
    return (
        <div className="w-screen h-screen flex items-center justify-center space-x-44">
           <div className='chat-container text-white'>
             <div className="w-full bg-pink-500 py-4 px-4 flex items-center justify-between">
                 <div className='flex items-center space-x-2'>
                    <span className='w-2 h-2 bg-green-300 rounded-full'></span>
                    <span className='text-lg'>{name}</span>
                 </div>
                 <button className="text-lg">&times;</button>
             </div>
             <div className="message-container py-3 bg-white">
        
              {
                messages.map((message,i) => {
                   return message.username === 'admin' ? (
                       <div key={i} className='message admin my-4'>
                          <p className="bg-gray-300">{message.text}</p>
                       </div>
                   ) : ( message.username === name ? (
                       <div key={i} className='message mess-right'>
                          <p className="bg-red-400">{message.text}</p>
                          <span>{message.username}</span>
                       </div>
                    ) : (
                      <div key={i} className='message'>
                        <p className="bg-green-400">{message.text}</p>
                        <span>{message.username}</span>
                      </div>
                    )
                 
                )})

              }
             </div>
             <div className='w-full bg-white border-t border-pink-500'>
                <div className='w-full flex'>
                <input
                   className="input"
                   type="text"
                   placeholder="Type a message..."
                   value={message}
                   className='message-input focus:outline-none hover:border-t focus:border-pink-600 text-black'
                   onChange={({ target: { value } }) => setMessage(value)}
                   onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button onClick={(e) => sendMessage(e)} className="send-btn py-2 px-4 border-l border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-white">send</button> 
                </div>
             </div>
            </div>
            <div style={{width:'500px'}} className="space-y-6">
                <h1 className="text-white text-3xl">Welcome {name} to {channel}</h1>
                <p className="text-white text-lg">Hello {name} , now you are connected with your friends and you can chat with them.</p>
                
                <div> 
                <h1 className="text-white text-2xl mb-5">Members</h1>
                <ul className="list-none text-white">
                   {
                     users.map((user,i) => (
                        <li key={i} className="flex items-center space-x-2">
                           <span className='w-2 h-2 bg-green-300 rounded-full'></span>
                           <span>{user.name}</span>
                        </li>
                     ))
                   }
                </ul>
                </div>
              
            </div>
        </div>
    )
}

export default Chat;
