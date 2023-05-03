import {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './signUp.css';

const SignUp = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      const user = await axios.post('http://localhost:8080/api/user/signup', {
        email, password, confirmPassword, name, phone, age, address, city
      }).then(() => {
        console.log('User registered successfully');
    
        toast.success(`User Registration Successful`, {
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
      <form className='signup' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        /><br/>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /><br/>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          name='confirmPassword'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        /><br/>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        /><br/>
        <label htmlFor='phone'>Phone</label>
        <input
          type='number'
          name='phone'
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        /><br/>
        <label htmlFor='age'>Age</label>
        <input
          type='number'
          name='age'
          onChange={(e) => setAge(e.target.value)}
          value={age}
        /><br/>
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          name='address'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        /><br/>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          name='city'
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;