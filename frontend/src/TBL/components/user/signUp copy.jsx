import {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './signUp.css';
import { useSignup } from '../../hooks/useSignup';

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

  const {signup, error, isLoading} = useSignup()

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { email, password } = form
    const newErrors = {}

    // email errors
    if ( !email || email === '' ) newErrors.email = 'Please enter an email!'
    else if (!validator.isEmail(email)) {
      newErrors.email = 'Please enter an email!'
    }
    // password errors
    if ( !password || password === '' ) newErrors.password = 'Please enter a password!'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = findFormErrors()

    if ( Object.keys(newErrors).length > 0 ) {
      // show errors
      setErrors(newErrors)
    } else {
      // If no errors
      await login(form.email, form.password)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, confirmPassword, name, phone, age, address, city)

  }

  return (
    <div>
      <ToastContainer />



      <br/>
      <div className='App d-flex flex-column align-items-center' id='loginForm'>
      <h3>Login</h3>
      <Form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' onChange={ e => setField('email', e.target.value)} isInvalid={ !!errors.email }/>
          <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' onChange={ e => setField('password', e.target.value)} isInvalid={ !!errors.password }/>
          <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Button disabled={isLoading} type='submit' variant="outline-primary">Login</Button>
        {error && <div className='error'>{error}</div>}
      </Form>
      <br/>
      </div>




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
        <button disabled={isLoading} type='submit'>Sign Up</button>
        {error && <div className='error'>{error}</div> }
      </form>
    </div>
  );
};

export default SignUp;