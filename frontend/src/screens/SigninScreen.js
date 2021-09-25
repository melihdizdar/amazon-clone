import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SigninScreen() {

    // eslint-disable-next-line no-unused-vars
    const [email,setEmail] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useState('');
    const submitHandler = (e) =>{
        e.preventDefault();
        // sigin action
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email Adress</label>
                    <input type="email" id="email" placeholder="Enter email" required
                    onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Email Adress</label>
                    <input type="password" id="password" placeholder="Enter password" required
                    onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        New customer? {' '} <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
