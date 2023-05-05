import {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './signUp.css';
import { useSignup } from '../../hooks/useSignup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUp = () => {

  const validator = require("validator");

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  
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
    const { email, password, confirmPassword, name, phone, age, province, city } = form
    const newErrors = {}

    // email errors
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if ( !email || email === '' ) {
      newErrors.email = 'Please enter an Email!'
    } else if (!email.match(validEmail)) {
      newErrors.email = 'Please enter a valid Email!'
    }

    // password errors
    const pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";

    if ( !password || password === '' ) {
      newErrors.password = 'Please enter an Password!'
    } else if(password.match(pattern)) {
      newErrors.password = 'Password should contain atleast 8 characters, 1 uppercase, 1 lowercase and 1 number!'
    }

    // confirm password errors
    if ( !confirmPassword || confirmPassword === '' ) {
      newErrors.confirmPassword = 'Please enter the Password again!'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password should match with Password!'
    }


    // password errors
    if ( !name || name === '' ) {
      newErrors.name = 'Please enter the Name!'
    } else if(name.length < 4) {
      newErrors.name = 'Length of Name must be greater than 3 characters!'
    }

    // password errors
    if ( !age || age === '' ) {
      newErrors.age = 'Please enter the Age!'
    } else if(age < 12) {
      newErrors.age = 'Age must be greater than 12!'
    }

    // password errors
    if ( !phone || phone === '' ) {
      newErrors.phone = 'Please enter a Phone number!'
    } else if(phone.length < 10) {
      newErrors.phone = 'Please enter a valid Phone number!'
    }

    // password errors
    if ( !city || city === '' ) {
      newErrors.city = 'Please enter a City!'
    } else if(city.length < 4) {
      newErrors.city = 'Length of City must be greater than 3 characters!'
    } 

    // password errors
    if ( !province || province === '' ) {
      newErrors.province = 'Please enter a Province!'
    } else if(province.length < 4) {
      newErrors.province = 'Length of Province must be greater than 3 characters!'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(form);

    const newErrors = findFormErrors()

    if ( Object.keys(newErrors).length > 0 ) {
      // show errors
      setErrors(newErrors)
    } else {
      // If no errors
      await signup(form.email, form.password, form.confirmPassword, form.name, form.phone, form.age, form.province, form.city)
    }
  }

  return (
    <div>
      <ToastContainer />
      <br/>
      <div className='App d-flex flex-column align-items-center' id='signupForm'>
      <h3>Register</h3>
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
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' onChange={ e => setField('confirmPassword', e.target.value)} isInvalid={ !!errors.confirmPassword }/>
          <Form.Control.Feedback type='invalid'>{ errors.confirmPassword }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' onChange={ e => setField('name', e.target.value)} isInvalid={ !!errors.name }/>
          <Form.Control.Feedback type='invalid'>{ errors.name }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control type='number' onChange={ e => setField('phone', e.target.value)} isInvalid={ !!errors.phone }/>
          <Form.Control.Feedback type='invalid'>{ errors.phone }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control type='text' onChange={ e => setField('age', e.target.value)} isInvalid={ !!errors.age }/>
          <Form.Control.Feedback type='invalid'>{ errors.age }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' onChange={ e => setField('city', e.target.value)} isInvalid={ !!errors.city }/>
          <Form.Control.Feedback type='invalid'>{ errors.city }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Province</Form.Label>
          <Form.Control type='text' onChange={ e => setField('province', e.target.value)} isInvalid={ !!errors.province }/>
          <Form.Control.Feedback type='invalid'>{ errors.province }</Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Button disabled={isLoading} type='submit' variant="outline-primary">Signup</Button>
        {error && <div className='error'>{error}</div>}
      </Form>
      <br/>
      </div>

    </div>
  );
};

export default SignUp;