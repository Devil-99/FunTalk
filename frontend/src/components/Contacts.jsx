import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
                    <div className='username' onClick={()=>changeCurrentChat(undefined,undefined)}>
                        <h2>{currentUserName}</h2>
                    </div>
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
background-color: #0C0C1B;
border-radius: 1rem;
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: Yellow;
    @media screen and (min-width: 250px) and (max-width: 500px){
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
        background-color: #14142D;
        min-height: 2rem;
        width: 90%;
        border-radius: 2rem;
        padding: 0.5rem;
        gap: 1rem;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        @media screen and (min-width: 250px) and (max-width: 500px){
            padding: 0.5rem;    
            width: 70%;
            border-radius: 0.5rem;
        }
        .username{
            overflow: hidden;
            margin-left: 1rem;
            h3{
                color: white;
            }
            @media screen and (min-width: 250px) and (max-width: 500px){
                margin-left: 0.2rem;
                h3{
                    font-size: 0.8rem;
                    margin: 0.2rem;
                }
            }
            
        }
    }
    .selected{
        background-color: #FB3B13 ;
        background-image: linear-gradient(to right,#FB3B13, #FEBB45);
    }
}
.current-user{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    @media screen and (min-width: 250px) and (max-width: 500px){
        gap: 0.2rem;    
    }
    .username{
        cursor: pointer;
        h2{
            @media screen and (min-width: 250px) and (max-width: 500px){
                font-size: 1rem;
                padding: 0.25rem 0.5rem 0.25rem 0.5rem;
                margin: 0rem;
            }
            background-color: red;
            padding: 0.5rem 1rem 0.5rem 1rem;
            border-radius: 2rem;
            color:white;
            margin:0;
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
