import { React , useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // importing the toastify css. Without this the notification will not visible.
import axios from 'axios';
import { loginRoute } from '../utils/apiRoutes';
import background from '../assets/black1.jpg';


function LoginPage() {

    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:"",
        password:""
    });

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {username,password} = values;
            const {data} = await axios.post(loginRoute,{username,password});
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
        const {username,password} = values;
        if(username===""){
            toast.error("Username is required !", toastOptions);
            return false;
        }
        if(password===""){
          toast.error("Password is required !", toastOptions);
          return false;
        }
        return true;
    }

    const handleChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value });
    }
// console.log("Login Page");
  return (
    <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className='Brand'>
                    <h1>FunTalk</h1>
                </div>
                <input type="text" placeholder='Username' name='username' onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder='Password' name='password' onChange={(e)=>handleChange(e)}/>
                <button type='submit' onClick={handleSubmit}>Login</button>
                <span>Don't have an account ? <Link to="/register">Register</Link></span>
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
background: url(${background});
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
        display:flex;
        justify-content: center;
        a{
            color: #997af0;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;

export default LoginPage