import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import {getAllMessegesRoutes, sendMessegeRoute, deleteMessegeRoutes  } from '../utils/apiRoutes';
import {v4 as uuidv4} from 'uuid';
import ChatHeader from './ChatHeader';
import {MdDelete} from 'react-icons/md';

export default function ChatContainer({currentChat,currentUser,socket}) {
    const [messeges,setMesseges] = useState([]);
    const [arrivalMessege,setArrivalMessege] = useState(null);
    const scrollRef = useRef();

    async function fetchData(){
        const response = await axios.post(getAllMessegesRoutes,{
            from: currentUser._id,
            to: currentChat._id,
        });
        setMesseges(response.data);
    }

    // this render the page whenever a chat is selected
    useEffect(()=>{
        fetchData();
    },[currentChat]);

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

const deleteMsg = async (msg)=>{
    await axios.post(deleteMessegeRoutes,{
        msgID:msg.messegeId
    });
    await fetchData();
    socket.current.emit('delete-msg',{
        to: currentChat._id,
    });
}

// this useEffect works for 1st time render to setup the socket.
useEffect(()=>{
    console.log("2nd useEffect");
    if(socket.current){
        socket.current.on('msg-recieved',(msg)=>{
            setArrivalMessege({fromSelf:false, messege:msg});
        });
        socket.current.on('msg-deleted',()=>{
            fetchData();
        });
    }
},[]);

// This useEffect works when any msg received.
useEffect(()=>{
    console.log(arrivalMessege);
    arrivalMessege && setMesseges((prev)=>[...prev , arrivalMessege]);
},[arrivalMessege]);

// this works when new msg send or recieved so that the page scroll down to the end.
useEffect(()=>{
    console.log("4th useEffect");
    scrollRef.current?.scrollIntoView({behaviour:'smooth'});
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
                                            { messege.fromSelf===true ? 
                                                (<button className='delete' onClick={(event)=>deleteMsg(messege)}><MdDelete/></button>)
                                            :<></>}
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
            @media screen and (min-width: 250px) and (max-width: 800px){
                padding: 0.5rem;
            }
            i{
                display:none;
                font-size:0.8rem;
                margin-left: 2rem;
            }
            &:hover{
                i{
                color:grey;
                display:block;
                }
            }
            p{
                margin: 0.2rem;
                @media screen and (min-width: 250px) and (max-width: 800px){
                    font-size: 0.8rem;
                }
            }
            .delete{
                background:none;
                border:none;
                cursor: pointer;
                svg{
                    margin:0;
                    font-size: 1.8rem;
                    @media screen and (min-width: 250px) and (max-width: 800px){
                        font-size: 0.8rem;
                    }
                }
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
