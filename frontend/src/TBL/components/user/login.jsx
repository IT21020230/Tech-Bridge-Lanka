import {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogin } from '../../hooks/useLogin';
import './login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

  const validator = require("validator");

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})

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

    </div> 
  );
};

export default Login;