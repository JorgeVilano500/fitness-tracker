'use server'
import { revalidatePath } from 'next/cache';
// import {supabase} from '../../utils/supabaseClient';
import { createClient } from '@/utils/supabase/server';
import {redirect} from 'next/navigation';

export const signup = async (formData: FormData) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  
    if (error) {
        console.error('Sign up error:', error)
        redirect('/error')
    }
    else {
        const {error} = await supabase.from('user_table').insert({email: data.user?.email, user_policy_id: data.user?.id})
        console.log('User signed up:', data)
        revalidatePath('/', 'layout');
        redirect('/tracker-page')
    };
  };
  
  export const logout = async () => {
    const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if(error) console.log('signout error:', error.message)
    else {
        redirect('/')
    }

  }

  export const login = async (formData: FormData) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  
    if (error) {
        console.error('Sign in error:', error)
        redirect('/error')
    }
    else {
        console.log('User signed in:', data)
        revalidatePath('/', 'layout')
        redirect('/tracker-page')
    };
  };
  

  export const getSession = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getSession();
    if (error) console.error('Session error:', error);
    else console.log('Session Data:', data);
  };
  