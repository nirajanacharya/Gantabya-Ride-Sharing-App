import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import GantabyaUser from '../assets/img/GantabyaUser-.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

    const [ridepopuppanel, setridepopuppanel] = useState(true)
    const ridepopuppanelRef = useRef(null)

    const [confirmridepopuppanel, setconfirmridepopuppanel] = useState(false)
    const confirmridepopuppanelRef = useRef(null)
    
    useGSAP(function () {
        if (confirmridepopuppanel) {
            gsap.to(confirmridepopuppanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmridepopuppanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmridepopuppanel ])
   

    useGSAP(function () {
        if (ridepopuppanel) {
            gsap.to(ridepopuppanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridepopuppanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridepopuppanel ])


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
            <div ref={ridepopuppanelRef}  className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    setridepopuppanel={setridepopuppanel}
                    setconfirmridepopuppanel={setconfirmridepopuppanel}
                />
            </div>
            <div ref={confirmridepopuppanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    setConfirmRidePopupPanel={setconfirmridepopuppanel} setridepopuppanel={setridepopuppanel} />
            </div>
        </div>
    );
}

export default CaptainHome