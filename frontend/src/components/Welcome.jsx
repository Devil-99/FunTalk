import React from 'react';
import Robot from '../assets/robot.gif';
import styled from 'styled-components';

export default function Welcome({currUser}) {
  return (
    <>
      {
        currUser && (
          <Container>
            <img src={Robot} alt="robot"/>
            <h1>
                Welcome,<span>{currUser.username}!</span>
            </h1>
            <h3>Please select a chat to start messeging</h3>
          </Container>
        )
      }
    </>
    
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
@media screen and (min-width: 300px) and (max-width: 500px){
h1{
  font-size: 1.5rem;
}
h3{
  font-size: 1rem;
}
}
img{
  @media screen and (min-width: 300px) and (max-width: 500px){
    height: 15rem;
  }
    height: 20rem;
}
span{
    color: #00ff00;
}
`;