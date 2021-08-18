import React from 'react';
import SignIn from '../components/signin/signin'

export default function Home(props) {
  return (
     <SignIn socket={props.socket} />
  )
}
