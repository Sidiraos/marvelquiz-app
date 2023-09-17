import React , {useState , useEffect} from 'react';
import Logout from '../Logout';
import Quiz from '../Quiz'
import {onAuthStateChanged} from 'firebase/auth';
import {auth , user} from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';

const Welcome = () => {

  const [isUserConnected , setIsUserConnected] = useState(false);
  const  [userData , setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsUserConnected(true);
        const userInfo = userAuth;
        const docRef = user(userInfo.uid);
        // console.log(docRef)
        // console.log(userInfo.uid);

        // Get user doc on database
        getDoc(docRef).then((docSnap)=>{
          // console.log(docSnap.exists())
          if (docSnap.exists()) {
            const docData = docSnap.data();
            // console.log("Document data:", docData);
            setUserData(docData);
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error)=>{
            console.error(error.message)
        });

      } else {
        // User is signed out
        if(!isUserConnected){
            navigate('/' , {replace : true})
         
        }
        // ...
      }
    });

      const unsubscribe = onAuthStateChanged(auth, () =>{});
      return () =>{
        console.log('unmounted');
        unsubscribe();
      }
    
  } , []);

  useEffect(()=>{
    userData.pseudo && toast.success("Hello " + userData.pseudo, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  } , [userData.pseudo])


  return (
    <div className='quiz-bg'>
        <div className='container'>
          {isUserConnected ? ( 
          <>
            <ToastContainer transition={Slide}/>
            <Logout />
            <Quiz userData = {userData} />
          </>
          ) :
          (
          <>
            <Loader loaderText={"Authentification"} />
          </>
          )}

        </div>
    </div>
  )
}

export default React.memo(Welcome)