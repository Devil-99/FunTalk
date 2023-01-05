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
padding: 0 2rem;
.user-details{
    h1{
        color: white;
    }
}
`;
