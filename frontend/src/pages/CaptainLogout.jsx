import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutCaptain = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error('No token found, redirecting to login.');
                navigate('/captain-login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Logout successful:', response.data);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } catch (error) {
                console.error('Error during logout:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    console.error('Unauthorized: Redirecting to login.');
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                }
            }
        };

        logoutCaptain();
    }, [navigate]);

    return null; 
};

export default CaptainLogout;
