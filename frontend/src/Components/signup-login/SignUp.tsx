import { ReactElement, useState } from "react";
import { SignUpObj } from "../../models/DataObjects";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';


const SignUp = (): ReactElement => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false);
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [linkText, setLinkText] = useState<string>('Already a user?')

    // SUMBIT CREDENTIALS ON BUTTON CLICK
    const handleSubmit = async (): Promise<void> => {
        const account: SignUpObj = {
            username: username,
            password: password,
            admin: admin,
        }

        // SIGNUP POST REQUEST
        try {
            // make request using provided credentials
            const response: Response = await fetch('http://localhost:1337/accounts/signup', {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });

            const { success } = await response.json();

            // update UI depending on success
            setIsWrong(!success);

            if (success) {
                setLinkText('Successfully signed up!')
            }

        } catch (err) {
            console.error('Error in signing up: ', err);
        };

        
    }

    return (
        <form className="account-form">
            <h2>Sign Up</h2>
            <label htmlFor="username-input" style={{color: isWrong ? "red" : "white"}}>Username</label>
            <input id="username-input" type="text" onChange={(e) => { setUsername(e.target.value) }} onClick={()=>{setIsWrong(false)}} />
            <label htmlFor="password-input" >Password</label>
            <input id="password-input" type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <section className="admin-container">
                <input id="admin-input" type="checkbox" onChange={(e) => { setAdmin(e.target.checked) }} />
                <label htmlFor="admin-input" >Admin user</label>
            </section>
            <input className="account-btn button" type="button" value='Sign up' onClick={handleSubmit} />
            <section className="question-container">
                <p>{linkText}</p>
                <Link to='/'>
                    <p className="link">Log in</p>
                </Link>
            </section>
        </form>
    )
};

export default SignUp;