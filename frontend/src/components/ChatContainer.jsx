import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';
import Logout from '../components/Logout';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import {getAllMessegesRoutes, sendMessegeRoute} from '../utils/apiRoutes';
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({currentChat,currentUser,socket}) {
    const [messeges,setMesseges] = useState([]);
    const [arrivalMessege,setArrivalMessege] = useState(null); 
    const scrollRef = useRef();

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.post(getAllMessegesRoutes,{
                from: currentUser._id,
                to: currentChat._id,
            });
            setMesseges(response.data);
        }
        fetchData();
    },[currentChat])

const handleSendMsg = async (msg)=>{
    await axios.post(sendMessegeRoute,{
        from: currentUser._id,
        to: currentChat._id,
        messege: msg
    });
    socket.current.emit('send-msg',{
        to: currentChat._id,
        from: currentUser._id,
        messege: msg,
    });

    const msgs = [...messeges];
    msgs.push({fromSelf:true , messege:msg});
    setMesseges(msgs);
};

useEffect(()=>{
    if(socket.current){
        socket.current.on('msg-reieved',(msg)=>{
            setArrivalMessege({fromSelf:false, messege:msg});
        })
    }
},[])

useEffect(()=>{
    arrivalMessege && setMesseges((prev)=>[...prev , arrivalMessege])
},[arrivalMessege]);

useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:'smooth'});
},[messeges]);

  return (
    <>
        {
            currentChat && (
                <Container>
                    <div className='chat-header'>
                        <div className='user-details'>
                            <h1>{currentChat.username}</h1>
                        </div>
                        <Logout/>
                    </div>
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
.chat-header{
    background-color: ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details{
        h1{
            color: white;
        }
    }
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
            max-width: 50%;
            overflow-wrap: break-word;
            padding: 1rem;
            border-radius: 1rem;
            color: #d1d1d1;
            font-size: 1.3rem;
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
