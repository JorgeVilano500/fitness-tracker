'use client';

import React, { useEffect, useState } from 'react';
import { FaDumbbell, FaRegBell } from 'react-icons/fa6';
import { IoPersonCircleSharp } from 'react-icons/io5';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

type NavbarProps = {
    user: User | null;
    logout: () => void
};


const Navbar: React.FC<NavbarProps> = ({user, logout}) => {
    const [timeValue, setTimeValue] = useState('');


    // const isUserLoggedIn = false;

    const formatDate = () => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
        });
        console.log(formatter.format(now).slice(-2)); // Example: '12:30:45'

        const hoursDigit = formatter.format(now).slice(-2);
        switch(hoursDigit) {
            case  'AM': 
                setTimeValue( 'Goodmorning');
                break;
            case 'PM': 
                setTimeValue( 'Goodevening');
                break;
            default: 
                setTimeValue( 'Not sure what time it is');
                break;
        };

    };

    useEffect(() => {
        formatDate();
    }, []);

  return (
        <section className='w-[100%] h-[auto]  py-2 bg-slate-400 col-span-10 bg-blend-darken flex flex-row lg:justify-between md:justify-between  '>
            <div className='flex flex-row sm:justify-between'>

          <FaDumbbell size={'3rem'} className='self-center md:mx-4 lg:mx-4 sm:mx-2 xs:w-[2.5rem] sm:w-[2.5rem] ' />
            <div className='mx-3 self-center'>
                <h3 className='text-xs text-slate-500' >{timeValue}</h3>
                <h3 className='text-xl font-thin text-slate-300 xs:hidden sm:hidden' >Welcome Back</h3>
            </div>
            </div>
            
            <div className='lg:w-[23%] md:w-[35%] sm:w-[100%] xs:w-[100%] self-center  flex flex-row sm:justify-end lg:justify-center gap-4'>
                <FaRegBell size={'1.5rem'} className='self-center  p-1 rounded transition ease-in-out hover:bg-slate-500 hover:text-slate-200 ' />
                {user ? 
                <>
                    <Link href={'/tracker-page'}><section className='flex flex-row gap-2 p-2 rounded transition ease-in-out hover:bg-slate-500 hover:text-slate-200 ' >
                    <IoPersonCircleSharp size={'1.5rem'} className='self-center' />
                    <p className='self-center sm:hidden lg:inline'>{user?.email}</p>
                </section></Link>
                <button onClick={logout} className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200'>Logout</button>
                
                </> : <Link href={'/login'}><button className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200'>Log in</button></Link>
            }
            
            </div>

        </section>
        
  );
};

export default Navbar;