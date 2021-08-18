import 'tailwindcss/tailwind.css';
import '../styles/globals.css'
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER = "http://127.0.0.1:5000";
const socket = io(`http://localhost:5000`);



function MyApp({ Component, pageProps }) {

  return <Component socket={socket} {...pageProps} />
}

export default MyApp
