import { Navbar, SideNav } from '@/components';
import { login, signup } from './actions';
import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { logout } from '../login/actions';
import { redirect } from 'next/navigation';
import OAuthButton from './oauth-signin';


export const metadata: Metadata = {
    title: 'Login Signup',
    description: 'Login to the fitness tracker page or register now. ',
  };

export default async function LoginPage() {

  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();
  if(error) console.log('Error retrieving user', error.message);

  if(data.user) {
    redirect('/tracker-page');
  }


  return (
    <div className='grid grid-cols-10 grid-rows-auto h-auto'>
        <Navbar logout={logout} user={data.user} />
        <SideNav />
        <div className=' col-span-9 lg:w-[25%] lg:h-[50%] md:w-[40%] md:h-[75%] sm:w-[90%] sm:h-[50%]  border-slate-200  gap-4 sm:p-0 lg:p-4 border-[1px] sm:mx-auto  lg:m-auto'>

    <form  className='flex flex-col sm:w-[80%] lg:w-[80%] border-slate-200 justify-center gap-4 p-4   mx-auto'>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email'  />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password'  />

      <section className='flex flex-row gap-3 justify-center'>
        <button formAction={login} className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200'>Log in</button>
        <p>Or</p>
        <button formAction={signup} className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200'>Sign up</button>

      </section>

    </form>
      <OAuthButton /> 
      </div>
    </div>
  );
}