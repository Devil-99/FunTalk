import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute , host } from '../utils/apiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
import background from '../assets/black1.jpg';

function ChatPages() {
  const navigate = useNavigate();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    // console.log("1st useEffect of chatPages");
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

  // socket connection establishment
  useEffect(()=>{
    // console.log("2nd useEffect of chatPages");
    if(currentUser){
      socket.current=io(host);
      socket.current.emit('add-user',currentUser._id);
    }
  },[currentUser]);

  useEffect(()=>{
    // console.log("3rd useEffect of chatPages");
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
background: url(${background});
gap: 1rem;
.container{
  height: 85vh;
  width: 85vw;
  @media screen and (min-width: 250px) and (max-width: 800px){
    height: 95vh;
    width: 99vw;
  }
  ${'' /* background-color: #00000076; */}
  background-color: #131324;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;
  }
  @media screen and (min-width: 250px) and (max-width: 800px){
    grid-template-columns: 32% 68%;
  }
}
`;

export default ChatPages;