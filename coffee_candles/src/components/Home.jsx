import React from 'react';
import {
  CameraIcon,
  CheckBadgeIcon,
  FaceSmileIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import bgImg from '../assets/cappucino.jpg';

const Home = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-full bg-no-repeat'>
        <img src={bgImg} className='w-full h-full object-cover absolute' />
      </div>
      {/* <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[-5%] mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200 border border-slate-300 rounded-xl text-center shadow-xl'></div>
      <p>Connect with us and let us know how we are doing!</p>
      <div className='flex-justify-between flex-wrap px-4'>
        <p className ='flex px-4 py-2 text-slate-500'><CameraIcon className='h-6 text-zinc-600' /> Instagram</p>
        <p className ='flex px-4 py-2 text-slate-500'><CheckBadgeIcon className='h-6 text-zinc-600' /> Twitter</p>
        <p className ='flex px-4 py-2 text-slate-500'><FaceSmileIcon className='h-6 text-zinc-600' /> Facebook</p>
        <p className ='flex px-4 py-2 text-slate-500'><EnvelopeIcon className='h-6 text-zinc-600' /> Email</p>
      </div> */}
    </div>
  );
};

export default Home;
