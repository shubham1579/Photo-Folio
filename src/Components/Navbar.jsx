import { useEffect } from 'react';
import { useAuth } from '../contextAPI/authContext';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(){

    const { isAuthenticated, handleLogOut, loggedOut, setLoggedOut, userName } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(loggedOut){
            setLoggedOut(false);
            navigate('/');
        }
    }, [navigate, loggedOut, setLoggedOut]);

    return (
        <div className='flex items-center justify-between px-3 sm:px-8 w-full h-[90px] bg-[#a0a0f9]'>

            <Link to={'/'} className='flex items-center'>
                <img src={logo} alt="Photopholio" className='mr-2 sm:mr-4 h-[35px] sm:h-[45px]' />
                <p className='text-base sm:text-lg font-semibold'>PhotoFolio</p>
            </Link>

            <div className='flex'>
                {isAuthenticated ? (
                    <p className='cursor-default mr-3 font-semibold text-base sm:text-lg'>{userName}</p>
                ) : ''}
                {isAuthenticated ? (
                    <p className='cursor-pointer text-red-600 font-semibold text-base sm:text-lg' onClick={() => handleLogOut()}>Sign Out</p>
                ) : (
                    <Link to={'/signup'} className='cursor-pointer font-semibold text-base sm:text-lg'>Sign Up</Link>
                )}
            </div>            
            
        </div>
    );

}

export default Navbar;