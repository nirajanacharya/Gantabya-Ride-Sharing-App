import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import GantabyaUser from '../assets/img/GantabyaUser-.png';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
    const [ridepopuppanel, setridepopuppanel] = useState(false);
    const ridepopuppanelRef = useRef(null);

    const [confirmridepopuppanel, setconfirmridepopuppanel] = useState(false);
    const confirmridepopuppanelRef = useRef(null);

    const [ride, setRide] = useState(null);

    const { captain } = useContext(CaptainDataContext);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log({
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };
        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();
        return () => clearInterval(locationInterval);
    }, [captain._id, socket]);

    socket.on('new-ride', (data) => {
        console.log(data);
        setRide(data);
        setridepopuppanel(true);
    });


    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        socket.emit('ride-confirmed', ride);

        setridepopuppanel(false);
        setconfirmridepopuppanel(true);
    }

    useGSAP(() => {
        if (confirmridepopuppanel) {
            gsap.to(confirmridepopuppanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(confirmridepopuppanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [confirmridepopuppanel]);

    useGSAP(() => {
        if (ridepopuppanel) {
            gsap.to(ridepopuppanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(ridepopuppanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [ridepopuppanel]);

    return (
        <div className="h-screen">
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src={GantabyaUser} alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img className="h-full  w-full object-cover"
                    src="https://raw.githubusercontent.com/MindorksOpenSource/ridesharing-uber-lyft-app/master/assets/nearby-cabs.png"
                    alt=""
                />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridepopuppanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setridepopuppanel={setridepopuppanel}
                    confirmRide={confirmRide}
                    setconfirmridepopuppanel={setconfirmridepopuppanel}
                />
            </div>
            <div ref={confirmridepopuppanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                ride={ride}
                setConfirmRidePopupPanel={setconfirmridepopuppanel} setridepopuppanel={setridepopuppanel} />
            </div>
        </div>
    );
}

export default CaptainHome;