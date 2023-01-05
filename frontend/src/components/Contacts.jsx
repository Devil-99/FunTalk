import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';

export default function Contacts({ allcontacts , currUser , changeChat }) {

    const [currentUserName,setCurrentUserName] = useState(undefined);
    const [currentSelected,setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currUser){
            setCurrentUserName(currUser.username);
        }
    },[currUser]);

    const changeCurrentChat =(index, contact)=>{
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
    <>
       {currentUserName && 
            (
            <Container>
                <div className='brand'>
                    <h1>FunTalk</h1>
                </div>
                <div className='contacts'>
                    {
                        allcontacts.map((contact,index)=>{
                            return (
                                <div className={`contact ${index === currentSelected ? "selected":""}`} 
                                key={index} 
                                onClick={()=>changeCurrentChat(index,contact)}
                                >
                                    <div className='username'>
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='current-user'>
                    <div className='username'>
                        <h2>{currentUserName}</h2>
                    </div>
                    <Logout/>
                </div>
            </Container>
            )
        }
    </>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
overflow: hidden;
background-color: #080420;
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: Yellow;
    @media screen and (min-width: 300px) and (max-width: 500px){
        h1{
            font-size: 1.3rem;
        }        
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact{
        display: flex;
        align-items:center;
        background-color: #ffffff39;
        min-height: 2rem;
        width: 90%;
        border-radius: 0.3rem;
        padding: 0.5rem;
        gap: 1rem;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        @media screen and (min-width: 300px) and (max-width: 500px){
            padding: 0.5rem;    
            width: 70%;
            border-radius: 0.5rem;
        }
        .username{
            @media screen and (min-width: 300px) and (max-width: 500px){
                h3{
                    font-size: 0.8rem;
                    margin: 0.2rem;
                }
            }
            h3{
                color: white;
            }
        }
    }
    .selected{
        background-color: #9186f3;
    }
}
.current-user{
    ${'' /* background-color: #0d0d30; */}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    @media screen and (min-width: 300px) and (max-width: 500px){
        gap: 0.2rem;    
    }
    .username{
        h2{
            @media screen and (min-width: 300px) and (max-width: 500px){
                font-size: 1rem;
                padding: 0.25rem 0.5rem 0.25rem 0.5rem;
                margin: 0rem;
            }
            background-color: red;
            padding: 0.5rem 1rem 0.5rem 1rem;
            border-radius: 2rem;
            color:white;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
        gap: 0.5rem;
        .username{
            h2{
                font-size: 1rem;
            }
        }
    }
}

`;
