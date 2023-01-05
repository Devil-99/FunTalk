import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute , host } from '../utils/apiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
import bckgrnd1 from '../assets/bckgrnd.jpg';
import bckgrnd2 from '../assets/bckgrnd2.jpg';

function ChatPages() {
  const navigate = useNavigate();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    async function getData(){
      if(!localStorage.getItem("chat-app-user")){
        navigate('/login');
      }
      else{
        setIsLoaded(true);
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
  getData();
  },[]);

  // scoket connection establishment
  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit('add-user',currentUser._id);
    }
  },[currentUser]);

  useEffect(()=>{
    async function fetchCurrentUser(){
      if(currentUser){
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
    }
  fetchCurrentUser();
  },[currentUser]);

  const handleChatChange = (chat)=>{
    setCurrentChat(chat);
  }

  

  return (<Container>
    <div className='container'>
      <Contacts allcontacts={contacts} currUser={currentUser} changeChat={handleChatChange} />
      {
        isLoaded && currentChat === undefined ?
        (<Welcome currUser={currentUser} />):
        (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
      }
    </div>
  </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
${'' /* background-color: #131324; */}
background: url(${bckgrnd1});
gap: 1rem;
.container{
  height: 85vh;
  width: 85vw;
  ${'' /* background-color: #00000076; */}
  background-color: #131324;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;
  }
  @media screen and (min-width: 300px) and (max-width: 800px){
    grid-template-columns: 32% 68%;
  }
}
`;

export default ChatPages;