import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../Firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email : '' ,
    password: '',
  })

  const [error , setError] = useState('');

  const handleChange = (e) => {
    const newData = {...loginData};
    newData[e.target.id] = e.target.value;
    setLoginData(newData);
  }
	const handleSubmit = (e) => {
		e.preventDefault();
    const {email , password} = loginData
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    // console.log(user);
    setLoginData({
      email : '',
      password : '',
    })
    navigate('/welcome'  , {replace : true})
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);
    setLoginData({
      email : '',
      password : '',
    })
    setError(errorCode);
  });
	};


  const errorMsg = error !== '' &&  <span>{error}</span>;
  const {email , password} = loginData;
  const showBtn = email && password && password.length > 6;

  const navigate = useNavigate();

	return (
		<div className="signUpLoginBox">
			<div className="slContainer">
				<div className="formBoxLeftLogin"></div>
				<div className="formBoxRight">
					<div className="formContent">
          				{errorMsg}
						<h2>Login</h2>
						<form onSubmit={handleSubmit}>
							<div className="inputBox">
								<input
									type="email"
									id="email"
									required
									value={loginData.email}
									onChange={handleChange}
								/>
								<label htmlFor="email">Email </label>
							</div>

							<div className="inputBox">
								<input
									type="password"
									id="password"
									required
									value={loginData.password}
									onChange={handleChange}
								/>
								<label htmlFor="password">Password</label>
							</div>

              			{showBtn ? <button className='submit' type='submit'>Login</button> : <button className='submit' type='submit' disabled>Login</button>}

						</form>

						<div className="linkContainer">
							<Link className="simpleLink" to="/signup">
								Don't have an account ?
							</Link>
							
							<Link className="simpleLink" to="/forgetpassword">
								Forgot Password ?
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
