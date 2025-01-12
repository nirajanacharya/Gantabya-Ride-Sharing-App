import React, { useContext, useEffect } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate(); 
    useEffect(() => { 
        const token = localStorage.getItem('token');
        console.log(token); 
        if (!token) {
            navigate('/captain-login'); 
        }   
    }, [navigate]); 

    return (
        <div>
            {children}
        </div>
    );
};

export default CaptainProtectWrapper;
