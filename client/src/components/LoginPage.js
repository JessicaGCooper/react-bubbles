import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth'

const LoginPage = (props) => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        }) 
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post('/api/login', user)
         .then( res => {
             console.log(res);
             localStorage.setItem('token', res.data.payload)
             //redirect to main page
             console.log('props', props)
             props.history.push('/bubblepage')
         })
         .catch( err => console.log(err));
    }

    return (
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
        <h1>Welcome to the Bubble App!</h1>
            <div className="formContainer">
            <legend>Log In</legend>
              <label>
                  Name: 
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
              </label>
              <label>
                  Password:
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
            <div className="formButtonContainer">
            <button>Log In</button>
            </div>
        </div>
        </form>
      </div>
    )
}

export default LoginPage