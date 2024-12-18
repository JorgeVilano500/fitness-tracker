import Link from 'next/link';
import { FaHouseUser } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

function SideNav() {
  return (
    <section className='h-screen md:w-[50%] xs:w-[100%] sm:w-[100%]  col-span-1  flex flex-col bg-slate-400 justify-start gap-5'>
           <Link href='/' className='self-center'> <FaHouseUser className='self-center p-2 rounded transition ease-in-out hover:bg-slate-500 hover:text-slate-200 ' size={'2.5rem'}  /> </Link>
           <Link href='/' className='self-center'> <FaCalendarAlt className='self-center p-2 rounded transition ease-in-out hover:bg-slate-500 hover:text-slate-200 ' size={'2.5rem'}  /> </Link>
           <Link href='/' className='self-center'> <IoSettingsSharp className='self-center p-2 rounded transition ease-in-out hover:bg-slate-500 hover:text-slate-200 ' size={'2.5rem'}  /> </Link>
    </section>
  );
};

export default SideNav;