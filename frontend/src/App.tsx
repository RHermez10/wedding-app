import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Camera from './Components/camera/Camera';
import Gallery from './Components/gallery/Gallery';
import Login from './Components/signup-login/Login';
import SignUp from './Components/signup-login/SignUp';
import StartPage from './Components/signup-login/StartPage';
import UserPage from './Components/UserPage';

function App(): JSX.Element {
// JSX element using React Router
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<StartPage />}>   
              <Route index element={<Login />} />
              <Route path='signup' element={<SignUp />} />
          </Route>
          <Route path='/user/' element={<UserPage />}> 
            <Route index element={<Gallery />} />
            <Route path='camera' element={<Camera />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
