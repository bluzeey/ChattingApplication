import React from 'react';
import {ClientState, StreamChat} from 'stream-chat';
import {ChannelList, Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import {ChannelContainer,ChannelListContainer} from './components'

import './App.css'
const apiKey='77fntt8jptw8'
const client= StreamChat.getInstance(apiKey)
function App() {
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
