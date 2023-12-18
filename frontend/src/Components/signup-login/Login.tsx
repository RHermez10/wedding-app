import { ReactElement, useState } from "react";
import { LoginObj } from "../../models/DataObjects";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

const Login = (): ReactElement => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    // SUBMIT CREDENTIALS ON BUTTON CLICK
    const handleSubmit = async () => {
        const account: LoginObj = {
            username: username,
            password: password,
        }

        // LOGIN POST REQUEST
        try {
            const response = await fetch('https://wedding-app-fmvx.onrender.com/accounts/login', {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });
            
            const data = await response.json();

            // if login request is successful, store user in sessionStorage and navigate to user page
            if (data.success) {
                sessionStorage.setItem('loggedIn', username);
                navigate('/user/');
            } else {
                // if unsuccessful, set state to display red label
                setIsWrong(true)
            }

        } catch(err) {
            console.error('Error in logging in: ', err);
        };

    };

    return (
        <form className="account-form">
            <h2>Log in</h2>
            <label htmlFor="username-input" style={{color: isWrong ? "red" : "white"}}>Username</label>
            <input id="username-input" type="text" onChange={ (e) => { setUsername(e.target.value) } } onClick={()=>{setIsWrong(false)}} />
            <label htmlFor="password-input" style={{color: isWrong ? "red" : "white"}}>Password</label>
            <input id="password-input" type="password" onChange={ (e) => { setPassword(e.target.value) } } onClick={()=>{setIsWrong(false)}} />
            <input className="account-btn button" type="button" value='Log in' onClick={handleSubmit} />
            <section className="question-container">
                <p>Not registered?</p>
                <Link to='/signup'>
                    <p className="link">Sign up</p>
                </Link>
            </section>
        </form>
    )
};

export default Login;