import '../../App.css';
import Footer from '../Footer';
import Header from '../Header';
import Landing from '../Landing';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../SignUp';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import { Routes, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';

function App() {
	return (
		<>
		<IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
			<Header />
			<Routes>
				<Route path='/' element = {<Landing />} />
				<Route path='/welcome' element = {<Welcome />} />
				<Route path='/login' element = {<Login />} />
				<Route path='/signup' element = {<Signup />} />
				<Route path='/forgetpassword' element = {<ForgetPassword />} />
				<Route path='*' element = {<ErrorPage />} />
			</Routes>
			<Footer />
		</IconContext.Provider>
		</>
	);
}

export default App;
