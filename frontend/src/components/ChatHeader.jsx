import React from 'react';
import styled from 'styled-components';
import Logout from '../components/Logout';

export default function ChatHeader({currentChat}) {
  return (
    <Container>
            <div className='user-details'>
                <h1>{currentChat.username}</h1>
            </div>
            <Logout/>
    </Container>
  )
};

const Container = styled.div`
background-color: ;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 1rem;
.user-details{
  @media screen and (min-width: 300px) and (max-width: 500px){
    h1{
      font-size: 1.6rem;
    }
}
    h1{
        color: white;
    }
}
`;
