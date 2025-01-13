import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const { captain, updateCaptain } = useContext(CaptainDataContext); // Extract captain from context
    const [isLoading, setisLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');


        if (!token) {
            // No token, redirect to login immediately
            navigate('/captain-login');
            return;
        }

        // Token exists, fetch captain's profile
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Captain profile:', response.data);
                updateCaptain(response.data);
                setisLoading(false); // Loading is complete
            })
            .catch((error) => {
                console.error('Error fetching captain profile:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    // Unauthorized, remove token and redirect to login
                    console.error('Unauthorized: Redirecting to login.');
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                } else {
                    setisLoading(false); // Handle other errors and stop loading
                }
            });
    }, [navigate, updateCaptain]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state while checking the token/profile
    }

    if (!captain) {
        return null; // Prevent rendering children if captain is not set
    }

    return <div>{children}</div>;
};

export default CaptainProtectWrapper;
