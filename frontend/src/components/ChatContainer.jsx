import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import {getAllMessegesRoutes, sendMessegeRoute } from '../utils/apiRoutes';
import {v4 as uuidv4} from 'uuid';
import ChatHeader from './ChatHeader';

export default function ChatContainer({currentChat,currentUser,socket}) {
    const [messeges,setMesseges] = useState([]);
    const [arrivalMessege,setArrivalMessege] = useState(null);
    const scrollRef = useRef();

    // this render the page every second
    useEffect(()=>{
        async function fetchData(){
            const response = await axios.post(getAllMessegesRoutes,{
                from: currentUser._id,
                to: currentChat._id,
            });
            setMesseges(response.data);
        }
        fetchData();
    },[currentChat,messeges]);

const handleSendMsg = async (msg)=>{
    await axios.post(sendMessegeRoute,{
        from: currentUser._id,
        to: currentChat._id,
        messege: msg,
    });
    socket.current.emit('send-msg',{
        to: currentChat._id,
        from: currentUser._id,
        messege: msg
    });

    const msgs = [...messeges];
    msgs.push({fromSelf:true , messege:msg});
    setMesseges(msgs);
};

// this useEffect works on my server when any msg recieved from others
useEffect(()=>{
    console.log("1st useEffect");
    if(socket.current){
        socket.current.on('msg-recieved',(msg)=>{
            setArrivalMessege({fromSelf:false, messege:msg});
        })
    }
},[]);

// This useEffect works when sender's server when they send any msg
useEffect(()=>{
    console.log("2nd useEffect");
    arrivalMessege && setMesseges((prev)=>[...prev , arrivalMessege]);
},[arrivalMessege]);

// this works when new msg send or recieved so that the page scroll down to the end.
// This also render in every second
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:'smooth'});
    console.log(messeges);
},[messeges]);

  return (
    <>
        {
            currentChat && (
                <Container>
                    <ChatHeader currentChat={currentChat}/>
                    <div className='chat-messeges' >
                        {
                            messeges.map((messege)=>{
                                return (
                                <div ref={scrollRef} key={uuidv4()}>
                                    <div className={`messege ${messege.fromSelf ? "sended" : "recieved"}`}>
                                        <div className='content'>
                                            <p>{messege.messege}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg}/>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-rows: 10% 80% 10%;
  }
@media screen and (min-width: 300px) and (max-width: 500px){
    grid-template-rows: 10% 80% 10%;
}
.chat-messeges{
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background-color: #00000075;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .messege{
        display: flex;
        align-items: center;
        .content{
            display: flex;
            flex-direction: row;
            max-width: 50%;
            overflow-wrap: break-word;
            padding: 1rem;
            border-radius: 1rem;
            color: #d1d1d1;
            font-size: 1.3rem;
            @media screen and (min-width: 300px) and (max-width: 800px){
                padding: 0.5rem;
                font-size: 1.1rem;
            }
            p{
                margin: 0.2rem;
            }
        }
    }
    .sended{
        justify-content: flex-end;
        .content{
            background-color: #37d7bf;
            color: black;
        }
    }
    .recieved{
        justify-content: flex-start;
        .content{
            background-color: #ffc0cb;
            color: black;
        }
    }
}
`;
