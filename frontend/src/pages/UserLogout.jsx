import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error('No token found, redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Logout successful:', response.data);
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error) {
                console.error('Error during logout:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    console.error('Unauthorized: Redirecting to login.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        logoutUser();
    }, [navigate]);

    return null; // Since it's a logout component, no UI is needed
};

export default UserLogout;
