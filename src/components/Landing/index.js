import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
const startingImgRef = useRef(null);
const welcomePageRef = useRef(null);
const [btn , setBtn] = useState(false);

useEffect(()=>{
    console.log(startingImgRef)
    startingImgRef.current.classList.add('show-claw')
   
    const timer = setTimeout(()=>{
        startingImgRef.current.classList.remove('show-claw');
        setBtn(true);

    }, 1000)
    return ()=> {
        clearTimeout(timer)
    }
} , [])

const handleMouseOver = (classToAdd , elt)=> {
    elt.current.classList.add(classToAdd)
}
const handleMouseOut = (classToRemove , elt)=> {
    elt.current.classList.remove(classToRemove)
}

const displayBtn = btn && (
    <>
        <div className='leftBox show-claw' >

         <Link to='/signup' onMouseOver={()=> handleMouseOver('leftImg' , welcomePageRef)} onMouseOut={()=> handleMouseOut('leftImg' , welcomePageRef) } className='btn-welcome'>Sign Up</Link>
        </div>
        <div className='rightBox show-claw' >
            <Link to='/login' onMouseOver={()=> handleMouseOver('rightImg' , welcomePageRef)} onMouseOut={()=> handleMouseOut('rightImg' , welcomePageRef) } className='btn-welcome'>Login</Link>
        </div>
    </>

)

const displayClaw = !btn && (
    <div className='startingImg' ref={startingImgRef}>

    </div>
)

  return (
    <main ref = {welcomePageRef}  className='welcomePage'>
        {
            displayClaw
        }

        {displayBtn}

    </main>
  )
}

export default Landing