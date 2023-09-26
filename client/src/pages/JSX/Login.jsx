import React, { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password
            })
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID)
            if (response.data.userID === undefined) {
              return alert('Invalid User')
            }
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Log In</h2>
        <div>
          <label htmlFor="username"> Username: </label>
          <input 
            type="text"
            id='username'
            placeholder='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="password"> Password: </label>
          <input 
            type="password"
            id='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
          />
          <button type='submit'>Log In</button>
        </div>
      </form>
      <p>New User? <Link to='/signup'>Sign Up</Link></p>
    </div>
  )
}