import { ReactElement, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, NavigateFunction, Link, useLocation, Location } from 'react-router-dom';
import cameraIcon from './svgs/camera-icon.svg';
import galleryIcon from './svgs/gallery-icon.svg';
import logoutIcon from './svgs/logout-icon.svg';


const UserPage = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const navigate: NavigateFunction = useNavigate();
    let location: Location = useLocation();
    const [isCamera, setIsCamera] = useState<boolean>(location.pathname === '/user/camera');

    // Update nav-icon when location changes
    useEffect((): void =>{
        setIsCamera(location.pathname === '/user/camera');
    }, [location]);

    // Is user logged in? Otherwise, redirect to login/signup.
    useEffect((): void => {
        if (!user) {
            navigate('/');
        };
    });

    // Handle log out
    const logOut = (): void => {
        sessionStorage.clear();
        navigate('/');
    }

    //React Element with Router Outlet to switch between gallery/camera
    return (
        <div className="user-page">
            <nav className="nav-bar">
                <img className="nav-item" onClick={logOut} src={logoutIcon} alt="user symbol" />
                <Link className='nav-item' to={`/user/${ isCamera ? '' : 'camera'}`}>
                    <img className='nav-icon' src={isCamera ? galleryIcon : cameraIcon} alt={`${isCamera ? 'gallery' : 'camera'} symbol`}/>
                </Link>
            </nav>

            <Outlet />
        </div>
    )
}

export default UserPage;