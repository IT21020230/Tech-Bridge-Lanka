import {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:7000/api/user/login', {
        email, password
      }).then(() => {
        console.log('User logged in successfully');
    
        toast.success(`User Login Successful`, {
          position: "bottom-left",
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
      });

  }

  return (
    <div>
      <ToastContainer />
      <form className='login' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br/>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;