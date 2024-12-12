'use server';
import { revalidatePath } from 'next/cache';
// import {supabase} from '../../utils/supabaseClient';
import { createClient } from '@/utils/supabase/server';
import {redirect} from 'next/navigation';
// import { getURL } from '@/utils/helpers';
import { Provider } from '@supabase/supabase-js';

export const signup = async (formData: FormData) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  
    if (error) {
        console.error('Sign up error:', error);
        redirect('/error');
    }
    else {
        const {error} = await supabase.from('user_table').insert({email: data.user?.email, user_policy_id: data.user?.id});
        if(error) console.log('Signup error on db', error.message);
        console.log('User signed up:', data);
        revalidatePath('/', 'layout');
        redirect('/tracker-page');
    };
  };
  
  export const logout = async () => {
    const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if(error) console.log('signout error:', error.message);
    else {
        redirect('/login');
    }

  };

  export const login = async (formData: FormData) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  
    if (error) {
        console.error('Sign in error:', error);
        redirect('/error');
    }
    else {
        console.log('User signed in:', data);
        revalidatePath('/', 'layout');
        redirect('/tracker-page');
    };
  };
  

  export const getSession = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getSession();
    if (error) console.error('Session error:', error);
    else console.log('Session Data:', data);
  };
  

  export async function oAuthSignIn(provider: Provider) {
    const supabase = await createClient();
    if(!provider) {
      return redirect('/login?message=No provider selected');
    }


    // const redirectUrl = getURL("/auth/callback");
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'github', 
      options: {
        // redirectTo: redirectUrl
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });


    if(error) {
      console.log('login error with provider', error.message);
      redirect('/login?message=Could not authenticate user');

    }


      return redirect(data.url);
    


  }