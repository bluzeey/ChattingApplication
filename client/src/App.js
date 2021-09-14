import React from 'react';
import {ClientState, StreamChat} from 'stream-chat';
import {ChannelList, Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import {ChannelContainer,ChannelListContainer,Auth} from './components'

import './App.css'
const cookies=new Cookies()

const apiKey='77fntt8jptw8'
const client= StreamChat.getInstance(apiKey)
const authToken=cookies.get("token")

if(authToken){
  client.connectUser({
      id:cookies.get('userId'),
      name:cookies.get('username'),
      fullname:cookies.get('fullname'),
      image:cookies.get('avatarURL'),
      hashedPassword:cookies.get('hashedPassword'),
      phoneNumber:cookies.get('phoneNumber'),
    }, authToken)
}
function App() {
  if(!authToken) return <Auth/>
  
  return (
     <div className="app__wrapper">
       <Chat client={client} theme="team light">
         <ChannelListContainer/>
         <ChannelContainer/>
       </Chat>
     </div>
  );
}

export default App;
