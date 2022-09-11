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
    <div className='absolute flex flex-col py-8 md:min-w-[760px] top-[30%] mx-1 
        md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200 opacity-80 border border-slate-600 rounded-xl text-center shadow-xl'>
        <p className='w-full self-center text-5xl p-9 mb-5 font-extrabold'>Coffee for everybody.</p>
        <button className='border-none w-20 self-center bg-[#2E4030] text-white mb-40'>SHOP</button>
    </div>
      <div className='absolute flex flex-row py-2 md:min-w-[760px] bottom-[1%] mx-1 
        md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200 border border-slate-300 rounded-xl text-center shadow-xl'>
        <p>Connect with us and let us know how we are doing!</p>
      <ul className='flex items-center p-4'>
        <li className ='flex px-1 py-1 text-slate-500'><CameraIcon className='h-6 text-zinc-600' /> Instagram</li>
        <li className ='flex px-1 py-1 text-slate-500'><CheckBadgeIcon className='h-6 text-zinc-600' /> Twitter</li>
        <li className ='flex px-1 py-1 text-slate-500'><FaceSmileIcon className='h-6 text-zinc-600' /> Facebook</li>
        <li className ='flex px-1 py-1 text-slate-500'><EnvelopeIcon className='h-6 text-zinc-600' /> Email</li>
      </ul>
    </div>
  </div>
  );
};

export default Home;
