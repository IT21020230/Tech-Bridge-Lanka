import {useState} from 'react';
import './login.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <div>
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
        <label htmlFor='email'>Password</label>
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

export default SignUp;