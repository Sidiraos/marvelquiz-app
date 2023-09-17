import React , {useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../Firebase/firebaseConfig";
import styled from 'styled-components';


const ForgetPassword = () => {
    const [email, setEmail] = useState()
    const [isEmailSent , setEmailSent] = useState(false);
    const [redirectMsg  , setRedirectMsg ] = useState('')
    
      const [error , setError] = useState('');
      const errorMsg = error !== '' &&  <span>{error}</span>;
      const showBtn = email && email.includes('@');
    
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            setEmailSent(true);
            setError('')
            setRedirectMsg(`Email sent to ${email} , check your email box for password reset link`)
            setTimeout(()=> {
                setEmail('')
                navigate('/login');
            }, 6000)
        })
        .catch((error) => {
            const errorCode = error.code;
            setEmail('')
            setError(errorCode);
            
        });
      }

      const RedirectMsg = styled.h2 `
        color: #f1f1f1;
        text-align: center;
        background-color: green;
        border: 1px solid green;
      
      `
  return (
    <div className="signUpLoginBox">
			<div className="slContainer">
				<div className="formBoxLeftForget"></div>

                {
                    isEmailSent ? 

                    (
                        <>
                            <div className="formBoxRight">
                                    <div className="formContent">
                                        <RedirectMsg>{redirectMsg}</RedirectMsg> 
                                    </div>
                            </div>
                        </>
                    ) : 
                    
                    (
                        <>
                            <div className="formBoxRight">
                                    <div className="formContent">
                                        {errorMsg}
                                        <h2>Forgot Password ?</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="inputBox">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <label htmlFor="email">Email </label>
                                    </div>
                                    {showBtn ? <button className='submit' type='submit'>Reset</button> : <button className='submit' type='submit' disabled>Reset</button>}
                                    </form>
                                    <div className="linkContainer">
                                        <Link className="simpleLink" to="/login">
                                            Already have an account? Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
				
			</div>
		</div>
  )
}

export default ForgetPassword