import React from 'react';
import {
  CameraIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import bgImg from '../assets/cappucino.jpg';

const Hero = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-full bg-no-repeat bg-cover img src={bgImg}'>
        <img src={bgImg} alt='/' />
      </div>
      <div className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-rows-2 max-w-[1240px} m-auto'>
          <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
            <p className='text-2xl'>
              Connect with us and let us know how we are doing!
            </p>
            <button className='py-3 px-6 sm:w-[60%]'>Instagram</button>
            <button className='py-3 px-6 sm:w-[60%]'>Twitter</button>
            <button className='py-3 px-6 sm:w-[60%]'>Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
