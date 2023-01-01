import { React , useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // importing the toastify css. Without this the notification will not visible.
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';
import bckgrnd1 from '../assets/bckgrnd.jpg';
import bckgrnd2 from '../assets/bckgrnd2.jpg';


function RegisterPage() {

    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:"Abc",
        email:"abc@gmail.com",
        password:"12345",
        confirmPassword:"12345"
    });

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {username,email,password} = values;
            const {data} = await axios.post(registerRoute,{username,email,password});
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate("/");
            }
        };
    }

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable:true,
        theme: "dark"
    }
    const handleValidation = ()=>{
        const {username,password,confirmPassword} = values;
        if(username.length<3){
            toast.error("Username length should be greater than 3 !", toastOptions);
            return false;
        }
        if(username===""){
            toast.error("Username is required !", toastOptions);
            return false;
        }
        if(password.length<5){
            toast.error("Password length should be greater than 5 !", toastOptions);
            return false;
        }
        else if(password !== confirmPassword){
            toast.error("Password and Confirm Password should be same !", toastOptions);
            return false;
        }
        else{
            return true;
        }
    }

    const handleChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value });
    }

  return (
    <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className='Brand'>
                    <h1>FunTalk</h1>
                </div>
                <input type="text" placeholder='Username' name='username' onChange={(e)=>handleChange(e)}/>
                <input type="email" placeholder='Email' name='email' onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder='Password' name='password' onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e)=>handleChange(e)}/>
                <button type='submit' onClick={handleSubmit}>Create User</button>
                <span>Already have an account ? <Link to="/login">Login</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
${'' /* background-color: #131324; */}
background: url(${bckgrnd2});
.Brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 1rem;
}
h1{
    color:white;
}
form{
    display:flex;
    flex-direction:column;
    gap: 2rem;
    ${'' /* background-color: #00000076; */}
    background-color: #131324;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color:transparent;
        padding: 1rem;
        border: 0.1rem solid #088f8f;
        border-radius: 0.4rem;
        color:white;
        width:1005;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #00ff00;
            outline:none;
        }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #bf40bf;
        }
    }
    span{
        color: white;
        a{
            color: #997af0;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;

export default RegisterPage