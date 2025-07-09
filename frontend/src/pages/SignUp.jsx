import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState("");


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch('http://localhost:8000/signUp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });
        const data = await response.json();
        if (response.ok) {
            setMessage("Signed up successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } 
        else {
            setMessage("Sign up failed: " + (data.message || "Unknown error"));
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default SignUp