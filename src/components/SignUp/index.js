import React , {useEffect, useState} from 'react';
import {auth , user} from '../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Link , useNavigate} from 'react-router-dom';
import { setDoc } from 'firebase/firestore';



const Signup = () => {
  const [loginData, setLoginData] = useState({
    pseudo : '',
    email : '',
    password : '',
    confirmPassword : ''
  });
  const [validation , setValidation] = useState({
    pseudo : false,
    email : false,
    password : false,
    confirmPassword : false
  })
  const [validationMsg , setValidationMsg] = useState({
    pseudo : '',
    email : '',
    password : '',
    confirmPassword : ''
  })

  const [error , setError] = useState('');

  const handleChange = (e) => {
    const newData = {...loginData};
    newData[e.target.id] = e.target.value;
    setLoginData(newData);
  }

   const {pseudo , email , password , confirmPassword} = loginData;
   function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
  }
  
    useEffect(()=>{
      if (email) {
        if (isValidEmail(email)) {
          console.log("L'adresse e-mail est valide.");
          setValidation({...validation , email : true})
          setValidationMsg({...validationMsg , email : 'This email is Valid'})
        } else {
          console.log("L'adresse e-mail n'est pas valide.");
          setValidation({...validation , email : false})
          setValidationMsg({...validationMsg , email : 'This email is not Valid'})
        }
      }

    } , [email]);


    //  should do it after for fixing bugs 
    //   useEffect(()=>{
    //   if(password.length > 0  && confirmPassword.length > 0) { 
    //     console.log("password changed i rendered")
    //     if (confirmPassword === password) {
    //       setValidation({...validation , confirmPassword : true})
    //       setValidationMsg({...validationMsg , confirmPassword : 'your passwords match'})
    //       console.log("your passwords match.");
    //     } else if (validation.confirmPassword) {
    //       setValidation({...validation , confirmPassword : false})
    //       setValidationMsg({...validationMsg , confirmPassword : 'Your passwords do not match'})
    //       console.log("Your passwords do not match.");
          
    //     }
    //   }
    // } , [password , confirmPassword, validation , validationMsg])

    useEffect(()=>{
      function isStrongPassword(password) {
        // At least 8 characters in length, one uppercase letter,
        // special characters, and numbers.
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        return regex.test(password);
      }
      if (password) {
        if (isStrongPassword(password)) {
          console.log("Strong password.");
          setValidation({...validation , password : true})
          setValidationMsg({...validationMsg , password : 'Strong password'})
        } else {
          console.log("The password must contains at least 8 characters, one uppercase letter, special characters, and numbers.");
          setValidation({...validation , password : false})
          setValidationMsg({...validationMsg , password : "The password must contains at least 8 characters, one uppercase letter, special characters, and numbers."})
        }
      }

      
    } , [password])


    const validationParagraphStyle = (validation) => {
      return {
        fontSize: "14px",
        color : `${validation ? '#4CAF50' : '#F44336'}` ,
      }
     
    }

    
   const showBtn = pseudo && validation.email && validation.password && password === confirmPassword ;

   const navigate = useNavigate();

   const handleSubmit = (e)=>{
    e.preventDefault();
    const {email , password} = loginData;
    createUserWithEmailAndPassword(auth, email, password)
    .then( authUser => {
      // console.log(authUser.user);
      return setDoc(user(authUser.user.uid) , {
        pseudo , 
        email
      })
    }
   
    )
    .then((userCredential) => {
    console.log("form submited")
    // Signed in
    setLoginData({
      pseudo : '',
      email : '',
      password : '',
      confirmPassword : ''
    });

    navigate('/welcome')
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode);
    setLoginData({
      pseudo : '',
      email : '',
      password : '',
      confirmPassword : ''
    });

    console.log(errorCode)
    console.log(errorMessage)
    // ..
  });
   }

  const errorMsg = error !== '' &&  <span>{error}</span> ;
  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
                <div className='formBoxLeftSignup'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                    {errorMsg}
                    <h2>Sign up</h2>

                        <form onSubmit={handleSubmit}>

                          <div className='inputBox'>
                                <input type="text" id='pseudo' value={loginData.pseudo} required onChange={handleChange} />
                              <label htmlFor='pseudo'>Pseudo</label>
                          </div>

                          <div className='inputBox'>
                                {email && <p style = {validationParagraphStyle(validation.email)}>{validationMsg.email}</p>}
                                 <input type="email" id='email' required value={loginData.email} onChange={handleChange} />
                                 <label htmlFor='email'>Email </label>
                                 
                          </div>

                          <div className='inputBox'>
                          {password && <p style = {validationParagraphStyle(validation.password)}>{validationMsg.password}</p>}
                                <input type="password" id='password' required value={loginData.password} onChange={handleChange}/>
                              <label htmlFor='password'>Password</label>

                          </div>

                          <div className='inputBox'>
                          {/* {confirmPassword && password && <p style = {validationParagraphStyle(validation.confirmPassword)}>{validationMsg.confirmPassword}</p>} */}

                                <input type="password" id='confirmPassword' required value={loginData.confirmPassword} onChange={handleChange} />
                              <label htmlFor='confirmPassword'>Confirm Password</label>

                          </div>

                          {showBtn ? <button className='submit' type='submit'>Sign up</button> : <button className='submit' type='submit' disabled>Sign up</button>}
                        </form>

                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>Already have an account ?</Link>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Signup