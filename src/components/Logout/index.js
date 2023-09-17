import React , {useEffect, useState} from 'react';
import { signOut } from 'firebase/auth';
import {auth} from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';



const Logout = () => {
  // isSwitch keeps track of toggle state
    const [isSwitched , setIsSwitch] = useState(false);
    const navigate = useNavigate();
    const [error , setError] = useState('') ;

    useEffect(()=>{
        if (isSwitched) {
            signOut(auth).then(() => {
                // Sign-out successful.
                setTimeout(()=>{
                    navigate('/' , {replace : true})
                } , 1000)
    
              }).catch((error) => {
                // An error happened.
                setError(error.message)
              });
        }
    } , [navigate , isSwitched]);

    const errorMsg = error !== '' &&  <span>{error}</span>;


    
    
  return (
    <div className='logoutContainer'>
        {errorMsg}
      <Tooltip
        anchorSelect="#logout"
        content="Logout"
        place='left'
        style={{fontSize : '20px' , background : '#d31017'}}
      />
        <label className='switch' id='logout'>
            <input type="checkbox" onChange={ (e) => setIsSwitch(e.target.checked)} checked = {isSwitched} />
            <span className='slider round'></span>
        </label>
    </div>
  )
}

export default Logout
