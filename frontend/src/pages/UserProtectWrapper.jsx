import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate(); 
    useEffect(() => { 
        const token = localStorage.getItem('token');
        console.log(token); 
        if (!token) {
            navigate('/login'); 
        }   
    }, [navigate]); 

    return (
        <div>
            {children}
        </div>
    );
};

export default UserProtectWrapper;
