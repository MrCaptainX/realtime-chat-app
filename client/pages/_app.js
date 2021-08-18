import 'tailwindcss/tailwind.css';
import '../styles/globals.css'
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER = "https://realm-chat-room.herokuapp.com/";
const socket = io(SERVER);



function MyApp({ Component, pageProps }) {

  return <Component socket={socket} {...pageProps} />
}

export default MyApp
