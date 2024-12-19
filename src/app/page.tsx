import { Navbar, SideNav} from '../components/index';
import { Metadata } from 'next';
import { logout } from './login/actions';
import { createClient } from '@/utils/supabase/server';
// import { createClient as pexelClient } from 'pexels';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fitness Tracker',
  description: 'This is a test of a fitness tracker I have been planning to build for a while. I will use iPHONE Shortcuts to get some automation for data tracking. '

};


export default async function Home() {
  const supabase = await createClient();
  // const pexel =  pexelClient(process.env.NEXT_PEXELS_API_KEY || '');



  const {data, error} = await supabase.auth.getUser();

  if(error) console.log('error retrieving user from db', error.message);
  


  return (
    <div className='relative h-screen grid grid-cols-10 grid-rows-auto ' >
      <Navbar logout={logout} user={data.user} />
      <SideNav />
        
        <div className='relative col-span-9'>
          {/* {
            pexel.photos.show({id: 791763}).then((photo) => {
              if ('url' in photo) {
                return <div style={{backgroundImage: `url(${photo.src.original})`}} className='absolute top-0 left-0 w-full h-full bg-cover object-cover xs:bg-top sm:bg-top lg:bg-center filter brightness-50 blur-sm'> </div>;
              } else {
                console.log('Photo error', photo.error);
              }
            })
          } */}
              <div className="relative h-[100%] z-10 text-center text-white p-8  bg-opacity-50 max-w-2xl m-auto mb-16 rounded-lg flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
          <p className="text-lg">Please Login first before moving on</p>
          <Link href={'/login'}><button className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200'>Log in</button></Link>
    </div>
        </div>
    
    </div> 
  );
}
