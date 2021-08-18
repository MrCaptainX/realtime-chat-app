import React , {useState} from 'react';
import {useRouter} from 'next/router';

const SignIn = (props) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const router = useRouter();

    const handleClick = () => {
        if(name.trim() !== '' && room.trim() !== '') {
            router.push(room + '/' + name)
        } else {
            alert("username and roomname are must !");
            window.location.reload();
        }
    }
 
    return (
        <div className='w-screen h-screen flex items-center justify-center flex-col'>
             <h1 className="text-pink-500 text-4xl mb-20">Welcome To Realtime Chat</h1>
            <div style={{width:'400px'}} className='form-container flex space-y-6 flex-col text-center bg-gray-700 px-10 py-10'>
                <h1 className="text-white text-2xl mb-2">Join Room</h1>
                <input placeholder="your name..." type="text" onChange={(e) => setName(e.target.value)}  className="w-full p-3  focus:outline-none focus:ring-2 focus:ring-pink-500" />
                <input placeholder="room name..." type="text" onChange={(e) => setRoom(e.target.value)}  className="w-full p-3  focus:outline-none focus:ring-2 focus:ring-pink-500" />
                <button onClick={handleClick} className="py-2 px-4 border mr-2 border-pink-500 bg-pink-500 hover:bg-pink-400 text-white rounded-3xl">Join now</button>
            </div>
        </div>
    )
}

export default SignIn;