import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const handleLogin = e => {
    e.preventDefault();

    // check if username and password match with stored data
    const storedData = localStorage.getItem('data');
    if (storedData) {
        const data = JSON.parse(storedData);
        const user = data.find(item => item.username === username && item.password === password);
    if (user) {
        setIsLoggedIn(true);
        setUserData(user);
    } else {
        alert('Incorrect username or password');
    }
    }
    };


    const handleRegistration = e => {
        e.preventDefault();
        // check if username already exists
        let data = localStorage.getItem('data');
        if (data) {
          data = JSON.parse(data);
          const existingUser = data.find(item => item.username === username);
          if (existingUser) {
            alert('Username already exists');
            return;
          }
        } else {
            data = []
        }
        // add new user to data and store in localStorage
        const newUser = { username, password };
        data.push(newUser);
        localStorage.setItem('data', JSON.stringify(data));
        document.getElementById("message").innerHTML = "Registration successful";
      };


        const handleLogout = () => {
          setIsLoggedIn(false);
          setUserData({});
        };
      
    
    if (isLoggedIn) {
        return (
            <div>
            <h1>Welcome, {userData.username}</h1>
            <h2>Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
            </div>
        );
    } else {
        return (
                <div className="text-center m-5-auto">
                    <h2>Sign in to us</h2>
                    <form onSubmit={handleLogin} >
                        <p>
                            <label>Username</label><br/>
                            <input type="text" name="first_name"  required value={username} onChange={e => setUsername(e.target.value)} />
                        </p>
                        <p>
                            <label>Password</label>
                            <br/>
                            <input type="password" name="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                        </p>
                        <p>
                            <button id="sub_btn" type="submit">Login</button>
                        </p>
                    </form>
        
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400 " role="alert" id='message'></div>
        
                    <footer>
                        <p>First time? <Link to="/register">Create an account</Link>.</p>
                        <p><Link to="/">Back to Homepage</Link>.</p>
                    </footer>
                </div>
                );
        
    }
}
