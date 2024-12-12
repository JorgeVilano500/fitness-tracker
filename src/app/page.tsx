import { Navbar, SideNav} from '../components/index';
import { Metadata } from 'next';
import { logout } from './login/actions';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Fitness Tracker',
  description: 'This is a test of a fitness tracker I have been planning to build for a while. I will use iPHONE Shortcuts to get some automation for data tracking. '

};


export default async function Home() {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();

  if(error) console.log('error retrieving user from db', error.message);
  


  return (
    <div className='grid grid-cols-10 grid-rows-auto h-auto' >
      <Navbar logout={logout} user={data.user} />
      <SideNav />
        
        <div className='my-4 col-span-8'>
          <h1>Welcome to the main page</h1>
          <h3>Please login</h3>
      
        </div>
    
    </div> 
  );
}
