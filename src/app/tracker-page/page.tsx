import {Activities, Navbar, Output, Overview, SideNav, History} from '../../components/index';
import { createClient } from '@/utils/supabase/server';
import {redirect} from 'next/navigation';
import { logout } from '../login/actions';

export default async function Home() {

  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();

  if(error || !data?.user) {
    redirect('/login');
  }
  const {data: trackerData, error: trackerError} = await supabase.from('daily_tracker').select().eq('user_policy_id', data?.user.id);
  
  if(trackerError) {
    console.log('tracking error on db', trackerError.message);

    console.log(trackerData);
    
  };


  return (
    <div className='grid col-span-10 row-span-auto grid-rows-auto h-screen' >
      <Navbar logout={logout} user={data.user} />
      <SideNav />
          
          <div className=' col-span-8 h-screen '>
          <h1 className='text-center text-xl  font-semibold'>Welcome {data.user.email}</h1> 
        <section className=' gap-8 lg:h-[50vh] sm:h-[70vh] w-[100%] flex sm:flex-col lg:flex-row justify-center'>
          <Activities />

          <Overview trackerData={trackerData} />

          <Output/>
        </section>
        <section className='lg:h-[auto] sm:h-auto sm:w-[90%] lg:w-[50%] mx-auto my-4 col-span-8 text-center'>
          <History />
        </section>
        </div>
    </div> 
  );
}
