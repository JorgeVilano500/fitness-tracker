'use client';
import { Provider } from '@supabase/supabase-js';
import React, { JSX } from 'react';
import { FaGithubSquare } from 'react-icons/fa';
import { oAuthSignIn } from './actions';

type OAuthProvider = {
    name: Provider,
    displayName: string,
    icon?: JSX.Element
}


function OAuthButton() {
    const oAuthProviders: OAuthProvider[] = [{
        name: 'github', 
        displayName: 'GitHub', 
        icon: <FaGithubSquare size={20} />
    }];

  return (
    <div>
        {
            oAuthProviders.map((provider, key) =>(
                <button key={key} onClick={async () => {
                    await oAuthSignIn(provider.name);
                } } className='flex flex-row justify-center gap-3 w-[60%] mx-auto bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200'> <span className='justify-center'>{provider.icon}</span>  Login with {provider.displayName} </button>
            ))
        }
    </div>
  );
};

export default OAuthButton;