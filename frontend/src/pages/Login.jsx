import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState("");


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });
        const data = await response.json();
        if (response.ok) {
            setMessage("Login successful! Redirecting to home...");
            localStorage.setItem("token", data.access);
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } 
        else {
            setMessage("Login failed: " + (data.message || "Unknown error"));
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;