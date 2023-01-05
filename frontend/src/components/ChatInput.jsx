import React, { useState } from 'react';
import styled from 'styled-components';
import {IoMdSend} from 'react-icons/io';

export default function ChatInput({handleSendMsg}) {
    const [msg,setMsg] = useState('');

    const sendMessege = (event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

    const handleChange = (event)=>{
        setMsg(event.target.value);
    }

  return (
    <Container>
        <form className='input-container' onSubmit={(event)=>sendMessege(event)}>
            <input type='text' placeholder='type your messege here' value={msg} onChange={handleChange} />
            <button className='submit'>
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
};

const Container = styled.div`
display: flex;
align-items: center;
background-color: #080420;
padding: 0.5rem 1rem 0.5rem 1rem;
.input-container{
    display:flex;
    align-items: center;
    width: 100%;
    border-radius: 2rem;
    gap: 2rem;
    background-color: #ffffff34;
    input{
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selction{
            background-color: #9186f3;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: #9a86f3;
        border: none;
        svg{
            font-size: 2rem;
            color: white;
        }
    }
}
`;